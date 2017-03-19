function UserCtrl($state, $localStorage, UserService, Flash) {
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
          Flash.clear();
          let message = '<strong>Welcome!</strong> You are now logged in',
            id = Flash.create('success', message);
        }
        else {
          Flash.clear();
          let message = '<strong>Wrong credentials!</strong> Please try again',
            id = Flash.create('alert', message);
        }
      }, function() {
        l
        vm.error = 'Failed to signin';
      });
    }
  };

}

export default {
  name: 'UserCtrl',
  fn: UserCtrl
};
