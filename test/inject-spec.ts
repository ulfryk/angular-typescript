import {TestServiceOne} from './inject';
import {testModule} from './module';
import 'angular-mocks';
import {Inject} from '../src/at-angular';

describe('@Inject', () => {
  let $http = null;
  let $parse = null;
  let testServiceOne = null;

  beforeEach(angular.mock.module(testModule.name));

  beforeEach(inject(function (_$http_, _$parse_, _TestServiceOne_) {
    $http = _$http_;
    $parse = _$parse_;
    testServiceOne = _TestServiceOne_;
  }));

  it('should be defined', () => {
    expect(Inject).toEqual(jasmine.any(Function));
  });

  it('should assign proper $inject array to service constructor', () => {
    expect(testServiceOne).toEqual(jasmine.any(TestServiceOne));
    expect(TestServiceOne.$inject).toEqual(['$http', '$parse']);
  });

  it('should make proper dependencies are passed to service constructor on instantiation', () => {
    expect(testServiceOne.$http).toBe($http);
    expect(testServiceOne.$parse).toBe($parse);
  });
});
