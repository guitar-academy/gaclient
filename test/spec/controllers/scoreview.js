'use strict';

describe('Controller: ScoreviewCtrl', function () {

  // load the controller's module
  beforeEach(module('gaclientApp'));

  var ScoreviewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ScoreviewCtrl = $controller('ScoreviewCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
