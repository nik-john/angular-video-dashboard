function LandingCtrl(VideoService, $sce, $state, AppSettings, $timeout, $localStorage) {
  'ngInject';
  // ViewModel
  const vm = this;
  vm.$storage = $localStorage;
  vm.players = [], vm.videoThumbnails = [], vm.skip = 0, vm.limit = 10;

  // Bind Videogular player APIs to vm.players array for future manipulation
  vm.onPlayerReady = function(API, index) {
    vm.players[index] = API;
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
  vm.getVideos = function(limit) {
    vm.loading = true;
    VideoService.get(vm.skip, limit || vm.limit)
      .then((data) => {
        var videos = data.data.data.map((video) => {
            return Object.assign(video, {
              url: video.url.replace('videos/', '').replace('.mp4', '')
            })
          }),
          mediaBaseUrl = AppSettings.CLOUDINARY_HOST,
          mediaEnhancementsUrl = 'h_150,q_auto/',
          mediaTargetUrl = AppSettings.CLOUDINARY_CLOUD;
        let vids = videos.map((video) => {
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
        vm.videoThumbnails = [...vm.videoThumbnails, ...vids];
        vm.skip = vm.videoThumbnails.length;
        $timeout(() => {
          vm.loading = false;
        }, 350);
      }, function(error) {
        console.log('Error occurred' + error);
      });
  };

  // Rating function
  vm.onRating = function(rating, id) {
    console.log("Rating entered");
    if (isNaN(rating) || rating < 1) {
      return;
    }
    // Persist rating to backend
    // Backend validation has been added
    // to prevent zero ratings
    VideoService.rate(rating, id)
      .then(function(data) {
        let ratingsArray  = data.data.data.ratings,
          ratings = Math.round(ratingsArray.reduce((a, b) => a + b, 0)/ratingsArray.length * 10) / 10
        vm.videoThumbnails.forEach((video) => {
          if(video.id === id) {
            console.log("Ratings before "+video.ratings);
            video.ratings = ratings;
            console.log("Ratings after "+video.ratings);
          }
        });
      }, function(error) {
        // TODO: Handle error gracefully
        console.log('Rating Error occurred' + error.data);
      });
  }
}

export default {
  name: 'LandingCtrl',
  fn: LandingCtrl
};
