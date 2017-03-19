function VideoThumbnail() {
  return {
    restrict: 'EA',
    templateUrl: 'directives/video-thumbnail.html',
    scope: {
      video: '=',
      vm: '=',
      index: '='
    }
  };
}

export default {
  name: 'videoThumbnail',
  fn: VideoThumbnail
};
