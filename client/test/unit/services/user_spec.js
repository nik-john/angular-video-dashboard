describe('Unit: UserService', function() {

  let httpBackend, UserService, AppSettings, $localStorage;

  beforeEach(function() {
    // instantiate the app module
    angular.mock.module('app');

    // mock the service
    angular.mock.inject((_$httpBackend_, _UserService_, _AppSettings_, _$localStorage_) => {
      httpBackend = _$httpBackend_;
      UserService = _UserService_;
      AppSettings = _AppSettings_;
      $localStorage = _$localStorage_;
    });
  });

  it('should exist', function() {
    expect(UserService).toBeDefined();
  });

  it('fn:isLoggedIn should return true if user is logged in ', function() {
    $localStorage.token = 'abc';
    expect(UserService.isLoggedIn()).toBe(true);
  });

  it('fn:logout should delete auth token', function() {
    $localStorage.token = 'abc';
    UserService.logout();
    expect($localStorage.token).toBeUndefined();
  });

  it('should authenticate user', function(done) {
    httpBackend.expect('POST', AppSettings.API_HOST + AppSettings.API_AUTH_LOGIN)
      .respond(201, {
        data: {
          sessionId: 'xyz',
          status: 'success'
        }
      });
    UserService.login({
      username: 'foo',
      password: 'bar'
    }).then((result) => {
      expect(result.data).toEqual({
        data: {
          sessionId: 'xyz',
          status: 'success'
        }
      });
    }).catch((error) => {
      expect(error).toBeUndefined();
    }).then(done);

    httpBackend.flush();
  });
});
