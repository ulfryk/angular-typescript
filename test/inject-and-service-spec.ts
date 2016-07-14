import {TestServiceThree} from './inject-and-service';
import {testModule} from './module';
import 'angular-mocks';

describe('@inject & @service together', () => {

  let $http = null;
  let $parse = null;
  let testServiceThree = null;

  beforeEach(() => {
    angular.mock.module(testModule.name);
    inject(function (_$http_, _$parse_, _TestServiceThree_) {
      $http = _$http_;
      $parse = _$parse_;
      testServiceThree = _TestServiceThree_;
    });
  });

  it('should instantiate decorated class as new service', () => {
    expect(testServiceThree).toBeDefined();
    expect(testServiceThree).toEqual(jasmine.any(TestServiceThree));
  });

  it('should assign proper $inject array to service constructor', () =>
    expect(TestServiceThree.$inject).toEqual(['$http', '$parse']));

  it('should make proper dependencies are passed to service constructor on instantiation', () => {
    expect(testServiceThree.$http).toBe($http);
    expect(testServiceThree.$parse).toBe($parse);
  });
});
