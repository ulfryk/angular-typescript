import {Controller} from '../src/at-angular';
import {FirstTestCtrl} from './controller';
import {testModule} from './module';
import 'angular-mocks';

describe('@controller (with @inject)', () => {
  let $scope = null;
  let $parse = null;
  let firstTestCtrl = null;

  beforeEach(() => {
    angular.mock.module(testModule.name);
    inject(function ($controller, $rootScope, _$parse_) {
      $scope = $rootScope.$new();
      $parse = _$parse_;
      firstTestCtrl = $controller((FirstTestCtrl as any).name, {
        $scope: $scope
      });
    });
  });

  it('should be defined', function () {
    expect(Controller).toEqual(jasmine.any(Function));
  });

  it('should instantiate decorated class as new service', function () {
    expect(firstTestCtrl).toBeDefined();
    expect(firstTestCtrl).toEqual(jasmine.any(FirstTestCtrl));
  });

  it('should assign proper $inject array to service constructor', function () {
    expect(FirstTestCtrl.$inject).toEqual(['$scope', '$parse']);
  });

  it('should make proper dependencies are passed to service constructor on instantiation', function () {
    expect(firstTestCtrl.$parse).toBe($parse);
    expect($scope.name).toBe((FirstTestCtrl as any).name);
  });
});
