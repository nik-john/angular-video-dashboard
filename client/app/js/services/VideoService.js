function VideoService($http, $localStorage, AppSettings, $q) {
  'ngInject';

  const service = {}, pagination = {};
  let $storage = $localStorage;

  // Video service to fetch one video
  service.getOne = function(id) {
    if (!$storage.token) {
      return $q.reject('Auth token required');
    }
    let url = AppSettings.API_HOST + AppSettings.API_VIDEO,
      params = {
        sessionId: $storage.token,
        videoId: id
      };
    return $http({
      url: url,
      method: 'GET',
      params: params
    });
  };

  // Video service to range of videos
  service.get = function(skip, limit) {
    if (!$storage.token) {
      return $q.reject('Auth token required');
    }
    let url = AppSettings.API_HOST + AppSettings.API_VIDEOS,
      params = {
        sessionId: $storage.token,
        skip: (skip) ? skip : 0,
        limit: (limit) ? limit : 10
      };
    return $http({
      url: url,
      method: 'GET',
      params: params
    });
  };

  service.rate = function(rating, id) {
    if (!$storage.token) {
      return $q.reject('Auth token required');
    }
    let correctedRating = (rating > 5) ? 5 : rating;
    return $http({
      url: AppSettings.API_HOST + AppSettings.API_RATINGS,
      method: 'POST',
      params: {
        sessionId: $storage.token
      },
      data: {
        videoId: id,
        rating: correctedRating
      }
    });
  }

  service.savePage = function(skip, limit) {
    pagination.skip = skip;
    pagination.limit = limit;
  }

  service.getPage = function() {
    return pagination;
  }
  return service;
}

export default {
  name: 'VideoService',
  fn: VideoService
};
