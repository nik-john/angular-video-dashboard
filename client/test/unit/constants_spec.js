describe('Unit: Constants', function() {

  let constants;

  beforeEach(function() {
    // instantiate the app module
    angular.mock.module('app');

    // mock the directive
    angular.mock.inject((AppSettings) => {
      constants = AppSettings;
    });
  });

  it('should exist', function() {
    expect(constants).toBeDefined();
  });

  it('should have an application name', function() {
    expect(constants.appTitle).toEqual('MeTube');
  });

  it('should have an API_HOST', function() {
    expect(constants.API_HOST).toEqual('http://localhost:8888/');
  });


  it('should have an API_VIDEO URL', function() {
    expect(constants.API_VIDEO).toEqual('video/');
  });



  it('should have an API_VIDEOS URL', function() {
    expect(constants.API_VIDEOS).toEqual('videos/');
  });


  it('should have an API_RATINGS', function() {
    expect(constants.API_RATINGS).toEqual('video/ratings/');
  });


  it('should have an API_AUTH_LOGIN', function() {
    expect(constants.API_AUTH_LOGIN).toEqual('user/auth/');
  });


  it('should have an CLOUDINARY_HOST', function() {
    expect(constants.CLOUDINARY_HOST).toEqual('http://res.cloudinary.com/drxrm1mlz/video/upload/');
  });


  it('should have an CLOUDINARY_CLOUD', function() {
    expect(constants.CLOUDINARY_CLOUD).toEqual('/v1489491356/');
  });


  it('should have an VIDEOGULAR_THEME', function() {
    expect(constants.VIDEOGULAR_THEME).toEqual('http://www.videogular.com/styles/themes/default/latest/videogular.css');
  });
});
