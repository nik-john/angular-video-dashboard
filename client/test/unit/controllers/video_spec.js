describe('Unit: VideoCtrl', function() {
  let $controller, VideoServiceMock, scope;
  beforeEach(function() {
    // instantiate the app module
    angular.mock.module('app');
  });

  beforeEach(function() {
    angular.mock.inject(function(_$controller_, $q, _$rootScope_) {
      $controller = _$controller_;
      scope = _$rootScope_.$new();
      // Mock up VideoService.get with dummy data
      VideoServiceMock = {
        getOne: function() {
          let deferred = $q.defer();
          deferred.resolve({
            data: {
              status: 'success',
              data: {
                _id: '123',
                name: 'efg',
                description: 'hij',
                url: 'lmn.mp4',
                __v: 1,
                ratings: [1, 2, 3, 4]
              }
            }
          });
          return deferred.promise;
        },
        rate: function(rating, id) {
          let deferred = $q.defer();
          deferred.resolve({
            data: {
              status: 'success',
              data: {
                ratings: [rating]
              }
            }
          });
          return deferred.promise;
        },
        get: function() {
          let deferred = $q.defer();
          deferred.resolve({
            data: {
              status: 'success',
              data: [{
                _id: 'abc',
                name: 'efg',
                description: 'hij',
                url: 'lmn.mp4',
                __v: 1,
                ratings: [1, 2, 3, 4]
              }, {
                _id: 'opq',
                name: 'rst',
                description: 'uvw',
                url: 'xyz.mp4',
                __v: 1,
                ratings: [5, 6, 7, 8]
              }]
            }
          });
          return deferred.promise;
        }
      };
    });
  });

  it('should exist', function() {
    let ctrl = $controller('VideoCtrl', {
      $scope: {},
      VideoService: VideoServiceMock
    });
    expect(ctrl).toBeDefined();
  });

  it('should contain contain a video object fetched from API', function() {
    let ctrl = $controller('VideoCtrl', {
      $scope: scope,
      $stateParams: {
        id: '123'
      },
      VideoService: VideoServiceMock
    });
    scope.$digest();
    expect(ctrl.video._id).toBe('123');
    expect(ctrl.video.name).toBe('efg');
    expect(ctrl.video.description).toBe('hij');
    expect(ctrl.video.url).toBe('lmn');
  });

  it('should contain videoId, selfRating', function() {
    let ctrl = $controller('VideoCtrl', {
      $scope: scope,
      $stateParams: {
        id: '123'
      },
      VideoService: VideoServiceMock
    });
    expect(ctrl.videoId).toBe('123');
    expect(ctrl.selfRating).toBe(0);
  });

  it('onRating should return unchanged if rating is 0 or invalid', function() {
    let ctrl = $controller('VideoCtrl', {
      $scope: scope,
      $stateParams: {
        id: '123'
      },
      VideoService: VideoServiceMock
    });
    ctrl.onRating(0);
    scope.$digest();
    expect(ctrl.selfRating).toBe(2.5);
    ctrl.onRating('asd');
    scope.$digest();
    expect(ctrl.selfRating).toBe(2.5);
  });

  it('onRating should return avg rating if API request is successful', function() {
    let ctrl = $controller('VideoCtrl', {
      $scope: scope,
      $stateParams: {
        id: '123'
      },
      VideoService: VideoServiceMock
    });
    ctrl.onRating(1);
    scope.$digest();
    expect(ctrl.selfRating).toBe(1);
  });


});
