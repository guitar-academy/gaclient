'use strict';

describe('Directive: ganavbar', function () {

  // load the directive's module
  beforeEach(module('gaclientApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ganavbar></ganavbar>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ganavbar directive');
  }));
});
