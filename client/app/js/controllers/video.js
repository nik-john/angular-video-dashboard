function VideoCtrl($stateParams, VideoService, $sce, AppSettings) {
  'ngInject';

  const vm = this;
  vm.videoId = $stateParams.id;
  vm.video = {};
  vm.selfRating = (vm.video.ratings) ? Math.round(vm.video.ratings.reduce((a, b) => a + b, 0)/vm.video.ratings.length * 10) / 10 : 0;
  vm.relatedVideos = [];
  vm.players = [];
  // Bind Videogular player APIs to vm.players array for future manipulation
  vm.onPlayerReady = function(API, index) {
    vm.players[index] = API;
    console.log(vm.players);
  };

  // If any Videogular player changes state to 'play', pause all others
  vm.onUpdateState = function(state, index) {
    if (state === 'play') {
      vm.players.filter((player, i) => {
        if (i !== index && player.currentState === 'play') {
          player.pause();
        }
      });
    }
  };
  // Fetch video from API
  VideoService.getOne(vm.videoId)
    .then((data) => {

      // Object.assign because we don't want to
      // mutate the state unnecessarily and want
      // to stick to Functional Programming best practices
      var video = Object.assign(data.data.data, {
          // Replace 'videos/' and '.mp4' in video.url
          // to get '/video_name_without_extn_or_video_path'
          // so as to reuse the URL for fetching both
          // video thumbnail and video src from Cloudinary
          url: data.data.data.url.replace('videos/', '').replace('.mp4', '')
        }),
        // Cloudinary src URL for video wihout . extension
        mediaUrl = AppSettings.CLOUDINARY_HOST + AppSettings.CLOUDINARY_CLOUD;

      // Object.assign because we don't want to
      // mutate the state unnecessarily and want
      // to stick to Functional Programming best practices
      vm.video = Object.assign(data.data.data, {
        // Video object according to Videogular specs
        sources: [{
          src: $sce.trustAsResourceUrl(mediaUrl + video.url + '.mp4'),
          type: 'video/mp4'
        }],
        theme: {
          url: AppSettings.VIDEOGULAR_THEME
        }
      });
      vm.selfRating = (vm.video.ratings) ? Math.round(vm.video.ratings.reduce((a, b) => a + b, 0)/vm.video.ratings.length * 10) / 10 : 0;
      return VideoService.get(0,50);
    }, function(error) {
      // TODO: Handle error gracefully
      console.log('Video Fetch Error occurred' + error.data);
    })
    // Fetch related videos: This is implemented by
    // fetching 50 videos and choosing 4 random ones
    // from among them
    .then((data) => {
      let resData = data.data.data,
        dataArray = [
          resData[Math.floor(Math.random() * resData.length)],
          resData[Math.floor(Math.random() * resData.length)],
          resData[Math.floor(Math.random() * resData.length)],
          resData[Math.floor(Math.random() * resData.length)]
        ].map((video) => {
            return Object.assign(video, {
              url: video.url.replace('videos/', '').replace('.mp4', '')
            })
          }),
        mediaBaseUrl = AppSettings.CLOUDINARY_HOST,
        mediaEnhancementsUrl = 'h_300,w_500,q_auto,bo_1px_solid_white/',
        mediaTargetUrl = AppSettings.CLOUDINARY_CLOUD;
        vm.relatedVideos = dataArray.map((video) => {
          return {
            preload: 'none',
            imgUrl: mediaBaseUrl + mediaEnhancementsUrl + mediaTargetUrl + video.url + '.png',
            id: video._id,
            name: video.name,
            // Find average rating
            ratings: Math.round(video.ratings.reduce((a, b) => a + b, 0)/video.ratings.length * 10) / 10,
            sources: [{
              src: $sce.trustAsResourceUrl(mediaBaseUrl + mediaTargetUrl + video.url + '.mp4'),
              type: 'video/mp4'
            }],
            theme: {
              url: AppSettings.VIDEOGULAR_THEME
            }
          }
        });
        console.log(vm.relatedVideos);
    }, function(error) {
      console.log('Error occurred' + error);
    });

  // Rating function
  vm.onRating = function(rating) {
    if (isNaN(rating) || rating < 1) {
      // Clear rating
      console.log('Rating cleared');
      return;
    }
    // Persist rating to backend
    // Backend validation has been added
    // to prevent zero ratings
    VideoService.rate(rating, vm.videoId)
      .then(function(data) {
        vm.video.ratings = data.data.data.ratings;
        vm.selfRating = (vm.video.ratings) ? Math.round(vm.video.ratings.reduce((a, b) => a + b, 0)/vm.video.ratings.length * 10) / 10 : 0;
        console.log('Rating saved! New rating is ' + vm.selfRating);
      }, function(error) {
        // TODO: Handle error gracefully
        console.log('Rating Error occurred' + error.data);
      });
  }
}

export default {
  name: 'VideoCtrl',
  fn: VideoCtrl
};
