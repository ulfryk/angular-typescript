import 'angular-mocks';
import {testModule} from './module';
import IComponentControllerService = angular.IComponentControllerService;
import {TestComponent} from './component';

describe('@Component (with @Inject)', () => {
  let scope;
  let element;
  let testComponentCtrl;

  beforeEach(() => {
    angular.mock.module(testModule.name);
    inject(function ($compile, $rootScope, $componentController: IComponentControllerService) {
      scope = $rootScope.$new();
      scope.$element = {};
      element = $compile('<test-component></test-component>')(scope);
      $rootScope.$digest();
      testComponentCtrl = $componentController('testComponent', scope);
    });
  });

  it('should instantiate decorated class as new service', () => {
    expect(element).toBeDefined();
    expect(testComponentCtrl).toEqual(jasmine.any(TestComponent));
  });

  it('should execute directive on element', () => {
    expect(element.hasClass('test-component')).toBe(true);
    expect(element.html()).toBe('<span class="ng-binding">hello</span>');
    expect(element.text()).toBe('hello');
  });
});
