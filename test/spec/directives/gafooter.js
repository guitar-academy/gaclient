'use strict';

describe('Directive: gafooter', function () {

  // load the directive's module
  beforeEach(module('gaclientApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<gafooter></gafooter>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the gafooter directive');
  }));
});
