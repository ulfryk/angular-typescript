import 'angular-mocks';
import {TestDirective} from './directive';
import {testModule} from './module';

describe('@Directive (with @Inject)', () => {
  let $scope = null;
  let element = null;

  beforeEach(() => {
    angular.mock.module(testModule.name);
    inject(function ($compile, $rootScope) {
      $scope = $rootScope.$new();
      element = $compile('<test-directive></test-directive>')($scope);
      $rootScope.$digest();
    });
  });

  it('should instantiate decorated class as new service', () => {
    expect(element).toBeDefined();
    expect($scope.ctrl).toEqual(jasmine.any(TestDirective));
  });

  it('should assign proper $inject array to service constructor', () => {
    expect(TestDirective.$inject).toEqual(['$scope', '$parse']);
  });

  it('should execute directive on element', () => {
    expect(element.hasClass('test-component')).toBe(true);
    expect($scope.name).toBe('FirstTestCtrl');
    expect($scope.ctrl.name).toBe('FAKE_CTRL_NAME');
    expect(element.text()).toBe($scope.name + $scope.ctrl.name);
  });
});
