function OnRun($rootScope, AppSettings, $timeout) {
  'ngInject';

  // change page title based on state
  $rootScope.$on('$stateChangeSuccess', (event, toState) => {
    $rootScope.pageTitle = '';

    if (toState.title) {
      $rootScope.pageTitle += toState.title;
      $rootScope.pageTitle += ' \u2014 ';
    }

    $rootScope.pageTitle += AppSettings.appTitle;
  });
  // change page title based on state
  $rootScope.$on('$stateChangeStart', (event, toState) => {
      $rootScope.loading = true;

  });
  $rootScope.$on('$stateChangeSuccess', (event, toState) => {
    $timeout(() => {
      $rootScope.loading = false;
    }, 350);
  });
  $rootScope.$on('$stateChangeStart', (event, toState) => {
    $timeout(() => {
      $rootScope.loading = false;
    }, 350);
  });

}

export default OnRun;
