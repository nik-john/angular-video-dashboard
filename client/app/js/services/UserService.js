import md5 from 'md5';

function UserService($http, $localStorage, AppSettings, Flash) {
  'ngInject';

  const service = {}
  let $storage = $localStorage;

  // Login API service
  service.login = function(user) {
    // Hash password before API call
    let hashedUser = Object.assign(user, {
      password: md5(user.password)
    });
    return new Promise((resolve, reject) => {
      $http.post(AppSettings.API_HOST + AppSettings.API_AUTH_LOGIN, hashedUser)
        .then((data) => {
          console.log('Entered then block')
          resolve(data);
        }, (err, status) => {
          reject(err, status);
        });
    });
  };

  // Method to check if user is logged in
  service.isLoggedIn = function() {
    return typeof $storage.token !== 'undefined';
  };

  // Logout method to destroy auth token
  // This is consumed by the 'Logout' state
  service.logout = function() {
    delete $storage.token;
    Flash.clear();
    let message = '<strong>Thanks!</strong> You are now logged out',
      id = Flash.create('success', message);
  };
  return service;
}

export default {
  name: 'UserService',
  fn: UserService
};
