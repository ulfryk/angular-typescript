import {Directive, Inject} from '../src/at-angular';
import IScope = angular.IScope;
import IParseService = angular.IParseService;

interface IFirstComponentScope extends IScope {
  name: string;
}

@Directive({
  name: 'testDirective',
  restrict: 'E',
  link: (scope, element, attrs, ctrl: TestDirective) => {
    element.addClass('test-component');
    ctrl.setCtrlName('FAKE_CTRL_NAME');
  },
  controllerAs: 'ctrl',
  template: '<span>{{name}}</span><span>{{ctrl.name}}</span>'
})
export class TestDirective {

  // And the rest are simple Ctrl instance members
  name: string;

  constructor(@Inject('$scope') private $scope: IFirstComponentScope,
              @Inject('$parse') private $parse: IParseService) {
    $scope.name = this.name = 'FirstTestCtrl';
  }

  setCtrlName(name: string): void {
    this.$parse('name').assign(this, name);
  }
}
