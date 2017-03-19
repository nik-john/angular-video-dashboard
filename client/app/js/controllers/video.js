function VideoCtrl($stateParams, VideoService, $sce, AppSettings) {
  'ngInject';

  const vm = this;
  vm.videoId = $stateParams.id;
  vm.selfRating = 0;

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
      })
    }, function(error) {
      // TODO: Handle error gracefully
      console.log('Video Fetch Error occurred' + error.data);
    });

  // Rating function
  vm.onRating = function(rating) {
    if (isNaN(rating) || rating < 1) {
      // Clear rating
      vm.selfRating = 0;
      console.log('Rating cleared');
      return;
    } else if (rating === vm.selfRating) {
      // If rating is unchanged, do nothing
      console.log('No change in rating. Skipping API request');
      return;
    }
    // Persist rating to backend
    // Backend validation has been added
    // to prevent zero ratings
    VideoService.rate(rating, vm.videoId)
      .then(function(data) {
        let ratings = data.data.data.ratings;
        vm.selfRating = ratings[ratings.length - 1];
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
