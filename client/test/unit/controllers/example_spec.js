describe('Unit: ExampleCtrl', function() {

  let ctrl;

  beforeEach(function() {
    // instantiate the app module
    angular.mock.module('app');

    angular.mock.inject(($controller) => {
      ctrl = $controller('ExampleCtrl');
    });
  });

  it('should exist', function() {
    expect(ctrl).toBeDefined();
  });

});
