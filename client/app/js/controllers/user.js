function UserCtrl($state, $localStorage, UserService) {
  'ngInject';

  const vm = this;

  vm.$storage = $localStorage;

  vm.login = function() {
    if(!(vm.username && vm.password)) {
      return;
    }
    let formData = {
      username: vm.username,
      password: vm.password
    };

    if( vm.username.length && vm.password.length ) {
      UserService.login(formData).then(function(res) {
        if (res.data && res.data.status && res.data.status.toString() === 'success') {
          vm.$storage.token = res.data.sessionId;
          $state.go('Landing');
        }
      }, function() {
        // TODO: Handle error gracefully
        vm.error = 'Failed to signin';
      });
    }
  };

}

export default {
  name: 'UserCtrl',
  fn: UserCtrl
};
