describe('Unit: UserCtrl', function() {
  let $controller, UserServiceMock, scope;
  beforeEach(function() {
    // instantiate the app module
    angular.mock.module('app');
  });

  beforeEach(function() {
    angular.mock.inject(function(_$controller_, $q, _$rootScope_) {
      $controller = _$controller_;
      scope = _$rootScope_.$new();
      // Mock up UserService with dummy data
      UserServiceMock = {
        login: function() {
          let deferred = $q.defer();
          deferred.resolve({
            data: {
              sessionId: 'xyz',
              status: 'success'
            }
          });
          return deferred.promise;
        }
      }
    });
  });

  it('should exist', function() {
    let controller = $controller('UserCtrl', {
      $scope: {}
    });
    expect(controller).toBeDefined();
  });

  it('should authenticate with good data', function() {
    let ctrl = $controller('UserCtrl', {
      UserService: UserServiceMock,
      $scope: scope,
      $localStorage: {}
    }, {
      username: 'foo',
      password: 'bar'
    });
    ctrl.login();
    scope.$digest();
    expect(ctrl.$storage.token).toBe('xyz');
  });


  it('should not authenticate with bad data', function() {
    let ctrl = $controller('UserCtrl', {
      UserService: UserServiceMock,
      $scope: scope,
      $localStorage: {}
    });
    ctrl.login();
    scope.$digest();
    expect(ctrl.$storage.token).toBe(undefined);
  });
});
