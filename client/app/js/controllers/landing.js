function LandingCtrl(VideoService, $sce, $state, AppSettings, $timeout) {
  'ngInject';
  // ViewModel
  const vm = this;
  // Array of Videogular players
  vm.players = [], vm.videoThumbnails = [], vm.skip = 0, vm.limit = 10;

  if($state.params) {
    vm.skip = $state.params.skip || 0;
    vm.limit = $state.params.limit || 10;
  }

  // Bind Videogular player APIs to vm.players array for future manipulation
  vm.onPlayerReady = function(API, index) {
    vm.players[index] = API;
  };

  // If any Videogular player changes state to 'play', pause all others
  vm.onUpdateState = function(state, index) {
    if (state === 'play') {
      vm.players.filter((player, i) => {
        if (i !== index) {
          // TODO: Pause if playing, else stop
          player.pause();
        }
      });
    }
  };
  vm.getVideos = function(limit) {
    console.log("Infinite scroll enabled");
    vm.loading = true;
    VideoService.get(vm.skip, limit || vm.limit)
      .then((data) => {
        var videos = data.data.data.map((video) => {
            return Object.assign(video, {
              url: video.url.replace('videos/', '').replace('.mp4', '')
            })
          }),
          mediaBaseUrl = AppSettings.CLOUDINARY_HOST,
          mediaEnhancementsUrl = 'h_100,w_100,r_max,q_auto,bo_1px_solid_white/',
          mediaTargetUrl = AppSettings.CLOUDINARY_CLOUD;
        let vids = videos.map((video) => {
          return {
            preload: 'none',
            imgUrl: mediaBaseUrl + mediaEnhancementsUrl + mediaTargetUrl + video.url + '.png',
            id: video._id,
            name: video.name,
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
        }, 500);
      }, function(error) {
        console.log('Error occurred' + error);
      });
  }
}

export default {
  name: 'LandingCtrl',
  fn: LandingCtrl
};
