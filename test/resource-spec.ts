import {UserResource} from './resource';
import {testModule} from './module';
import 'angular-mocks';

describe('@Resource (with @inject)', () => {
  let $http = null;
  let $parse = null;
  let $resource = null;
  let testResourceOne = null;
  beforeEach(angular.mock.module(testModule.name));
  beforeEach(inject(function (_$http_, _$parse_, _$resource_, _UserResource_) {
    $http = _$http_;
    $parse = _$parse_;
    $resource = _$resource_;
    testResourceOne = _UserResource_;
  }));

  it('should prepare decorated resource class as new service', () => {
    expect(testResourceOne).toBeDefined();
  });

  it('should copy all class features to provided resource class', () => {
    Object.keys(angular.extend({}, testResourceOne)).forEach(key =>
      expect(testResourceOne[key]).toEqual(testResourceOne[key]));
    Object.keys(angular.extend({}, UserResource.prototype)).forEach(key =>
      expect(UserResource.prototype[key]).toEqual(UserResource.prototype[key]));
  });

  it('should assign proper $inject array to service constructor', () => {
    expect(UserResource.$inject).toEqual(['$http', '$parse']);
    expect(UserResource.$inject).toEqual(['$http', '$parse']);
  });

  it('should make mix of class instance and resource instance (on new)', () => {
    let key, ref, ref1, resource, results, value;
    let instance = new UserResource({
      name: 'Grants',
      age: 15
    });
    let Resource = $resource(UserResource.url);
    resource = new Resource({
      name: 'Grants',
      age: 15
    });
    results = [];
    for (key in resource) {
      value = resource[key];
      results.push(expect((ref1 = resource[key]) != null ? ref1.toString() : void 0)
        .toEqual((ref = instance[key]) != null ? ref.toString() : void 0));
    }
    return results;
  });
  it('should make proper class instance (on new)', () => {
    let model = {
      name: ' :: THE NAME :: ',
      age: 1001.1
    };
    let instance = new UserResource(model);
    let fakeInstance = new UserResource(model);
    expect(instance.name).toBe(model.name);
    expect(instance.age).toBe(model.age);
    expect(fakeInstance.name).toBe(model.name);
    expect(fakeInstance.age).toBe(model.age);
    expect(instance.getLabel()).toBe('application/json, text/plain, */* :: THE NAME :: 1001.1');
  });
});
