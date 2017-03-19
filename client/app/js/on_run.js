function OnRun($rootScope, AppSettings, $timeout, UserService) {
  'ngInject';

  // change page title based on state
  $rootScope.$on('$stateChangeSuccess', (event, toState) => {
    $rootScope.pageTitle = '';

    if (toState.title) {
      $rootScope.pageTitle += toState.title;
      $rootScope.pageTitle += ' \u2014 ';
    }

    $rootScope.pageTitle += AppSettings.appTitle;
    $timeout(() => {
      $rootScope.loading = false;
    }, 500);
    $rootScope.isLoggedIn = UserService.isLoggedIn();
  });
  // change page title based on state
  $rootScope.$on('$stateChangeStart', (event, toState) => {
      $rootScope.loading = true;
  });
  $rootScope.$on('$stateChangeError', (event, toState) => {
    $timeout(() => {
      $rootScope.loading = false;
    }, 500);
  });

}

export default OnRun;
