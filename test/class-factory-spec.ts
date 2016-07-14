import {testModule} from './module';
import {TestFactory} from './class-factory';
import 'angular-mocks';

describe('@Factory (with @inject)', () => {
  let $http = null;
  let $parse = null;
  let testFactory: TestFactory = null;

  beforeEach(() => {
    angular.mock.module(testModule.name);
    inject(function (_$http_, _$parse_, _TestFactory_) {
      $http = _$http_;
      $parse = _$parse_;
      testFactory = _TestFactory_;
    });
  });

  it('should create class as a service', () => {
    expect(testFactory).toBeDefined();
    expect(testFactory).toBe(TestFactory);
  });

  it('should assign proper $inject array to service constructor', () => {
    expect(TestFactory.$inject).toEqual(['$http', '$parse']);
  });

  it('should add proper dependencies to constructor prototype', () => {
    expect(TestFactory.prototype.$http).toBe($http);
    expect(TestFactory.prototype.$parse).toBe($parse);
  });

  it('should provide proper dependencies for instance', () => {
    let testInstanceOne: TestFactory = new TestFactory();
    expect(testInstanceOne.$http).toBe($http);
    expect(testInstanceOne.$parse).toBe($parse);
    expect(testInstanceOne.accept).toBe('application/json, text/plain, */*');
  });
});
