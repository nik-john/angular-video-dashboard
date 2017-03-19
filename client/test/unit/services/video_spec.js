describe('Unit: VideoService', function() {

  let httpBackend, VideoService, AppSettings, $localStorage;

  beforeEach(function() {
    // instantiate the app module
    angular.mock.module('app');

    // mock the service
    angular.mock.inject((_$httpBackend_, _VideoService_, _AppSettings_, _$localStorage_) => {
      httpBackend = _$httpBackend_;
      VideoService = _VideoService_;
      AppSettings = _AppSettings_;
      $localStorage = _$localStorage_;
    });
  });

  it('should exist', function() {
    expect(VideoService).toBeDefined();
  });

  it('fn:getOne should fetch one video', function(done) {
    $localStorage.token = 'xyz';
    httpBackend.expect('GET', AppSettings.API_HOST + AppSettings.API_VIDEO + '?videoId=123&sessionId=xyz')
      .respond(201, {
        data: {
          status: 'success',
          data: {
            _id: '123',
            name: 'abc',
            description: 'efg',
            url: 'videos/hij.mp4',
            ratings: [3, 2, 4, 3]
          }
        }
      });
    VideoService.getOne(123)
      .then((result) => {
        expect(result.data).toEqual({
          data: {
            status: 'success',
            data: {
              _id: '123',
              name: 'abc',
              description: 'efg',
              url: 'videos/hij.mp4',
              ratings: [3, 2, 4, 3]
            }
          }
        });
      }).catch((error) => {
        expect(error).toBeUndefined();
      }).then(done);

    httpBackend.flush();
  });

  it('fn:get should fetch array of videos', function(done) {
    $localStorage.token = 'xyz';
    httpBackend.expect('GET', AppSettings.API_HOST + AppSettings.API_VIDEOS + '?limit=10&sessionId=xyz&skip=0')
      .respond(201, {
        data: {
          status: 'success',
          data: [{
            _id: '123',
            name: 'abc',
            description: 'efg',
            url: 'videos/hij.mp4',
            ratings: [3, 2, 4, 3]
          },{
            _id: '456',
            name: 'abc',
            description: 'efg',
            url: 'videos/hij.mp4',
            ratings: [3, 2, 4, 3]
          },{
            _id: '789',
            name: 'abc',
            description: 'efg',
            url: 'videos/hij.mp4',
            ratings: [3, 2, 4, 3]
          }]
        }
      });
    VideoService.get()
      .then((result) => {
        expect(result.data.data.data.length).toEqual(3);
      }).catch((error) => {
        expect(error).toBeUndefined();
      }).then(done);

    httpBackend.flush();
  });

  it('fn:get should implement pagination', function(done) {
    $localStorage.token = 'xyz';
    httpBackend.expect('GET', AppSettings.API_HOST + AppSettings.API_VIDEOS + '?limit=2&sessionId=xyz&skip=0')
      .respond(201, {
        data: {
          status: 'success',
          data: [{
            _id: '123',
            name: 'abc',
            description: 'efg',
            url: 'videos/hij.mp4',
            ratings: [3, 2, 4, 3]
          },{
            _id: '456',
            name: 'abc',
            description: 'efg',
            url: 'videos/hij.mp4',
            ratings: [3, 2, 4, 3]
          }]
        }
      });
    VideoService.get(0,2)
      .then((result) => {
        expect(result.data.data.data.length).toEqual(2);
      }).catch((error) => {
        expect(error).toBeUndefined();
      }).then(done);

    httpBackend.flush();
  });
});
