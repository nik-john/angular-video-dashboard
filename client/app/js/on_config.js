function OnConfig($stateProvider, $locationProvider, $urlRouterProvider, $compileProvider, $httpProvider, $localStorageProvider, $qProvider) {
  'ngInject';

  $qProvider.errorOnUnhandledRejections(false)

  if (process.env.NODE_ENV === 'production') {
    // Turn off logs on Production
    $compileProvider.debugInfoEnabled(false);
  }

  $httpProvider.interceptors.push(function($q, $location) {
    // Check for Auth token on every request
    return {
      'request': function(config) {
        config.headers = config.headers || {};
        // We want to use .get here as per ngStorage's best practices
        if ($localStorageProvider.get('token')) {
          config.headers.Authorization = 'Bearer ' + $localStorageProvider.get('token');
        }
        return config;
      },
      'responseError': function(response) {
        if (response.status === 401 || response.status === 403) {
          $location.path('/login');
        }
        return $q.reject(response);
      }
    };
  });

  // This is to prevent ugly hash banged URLs
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $stateProvider
    .state('Landing', {
      url: '/',
      controller: 'LandingCtrl as lan',
      templateUrl: 'landing.html',
      title: 'Home',
      resolve: {
        authenticate: authenticate
      }
    })
    .state('Login', {
      url: '/login',
      controller: 'UserCtrl as user',
      templateUrl: 'login.html',
      title: 'Login',
      resolve: {
        isLoggedIn: isLoggedIn
      }
    })
    .state('Logout', {
      url: '/logout',
      controller: function(UserService, $state) {
        UserService.logout();
        $state.go($state.current, {}, {
          reload: true
        });
      },
      resolve: {
        authenticate: authenticate
      }
    })
    // TODO: Implement this state
    .state('Profile', {
      url: '/me',
      controller: 'UserCtrl as user',
      templateUrl: 'me.html',
      title: 'Profile',
      resolve: {
        authenticate: authenticate
      }
    })
    .state('Video', {
      url: '/:id',
      controller: 'VideoCtrl as vid',
      templateUrl: 'video.html',
      title: 'Video',
      resolve: {
        authenticate: authenticate
      }
    });

  // Auth helper for protected routes
  function authenticate($q, UserService, $state, $timeout) {
    if (UserService.isLoggedIn()) {
      // Resolve the promise successfully
      console.log('User is logged in');
      return $q.when();
    } else {
      $timeout(function() {
        // This code runs after the authentication promise has been rejected.
        // Go to the log-in page
        $state.go('Login');
      })
      // Reject the authentication promise to prevent the state from loading
      console.log('User NOT is logged in');
      return $q.reject();
    }
  }

  // Auth helper to check if user is already logged in
  function isLoggedIn($q, UserService, $state, $timeout) {
    if (!UserService.isLoggedIn()) {
      // Resolve the promise successfully
      console.log('User is not logged in, proceed to login page');
      return $q.when();
    } else {
      $timeout(function() {
        // This code runs after the authentication promise has been rejected.
        // Go to the log-in page
        $state.go('Landing');
      })
      // Reject the authentication promise to prevent the state from loading
      console.log('User already is logged in');
      return $q.reject();
    }
  }

  // Short hand .otherwise is breaking on Unit testing, ergo, long version
  $urlRouterProvider.otherwise(function($injector) {
    var $state = $injector.get('$state');
    $state.go('Landing');
  });

}

export default OnConfig;
