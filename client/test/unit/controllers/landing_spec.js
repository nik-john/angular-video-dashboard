describe('Unit: LandingCtrl', function() {
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
      }
    });
  });

  it('should exist', function() {
    let ctrl = $controller('LandingCtrl', {
      $scope: {}
    });
    expect(ctrl).toBeDefined();
  });

  it('should contain a players array', function() {
    let ctrl = $controller('LandingCtrl', {
      $scope: scope
    });
    expect(ctrl.players.length).toBeDefined();
  });

  it('should assign API to players array', function() {
    let ctrl = $controller('LandingCtrl', {
      $scope: scope
    });
    ctrl.onPlayerReady('foo', 1);
    expect(ctrl.players[1]).toBe('foo');
  });

  it('should stop all other players on play', function() {
    // Pass vm.players as the third argument to $controller
    let ctrl = $controller('LandingCtrl', {
      $scope: scope
    }, {
      players: [{
        state: 'play',
        pause: function() {
          return this.state = 'pause';
        }
      }, {
        state: 'pause',
        pause: function() {
          return this.state = 'pause';
        }
      }, {
        state: 'play',
        pause: function() {
          return this.state = 'pause';
        }
      }]
    });
    ctrl.onUpdateState('play', 2);
    // This should set the state of all players but players[2] to pause
    expect(ctrl.players[0].state).toBe('pause');
    expect(ctrl.players[1].state).toBe('pause');
    expect(ctrl.players[2].state).toBe('play');
  });

});
