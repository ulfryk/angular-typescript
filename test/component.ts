import {Component, Inject} from '../src/at-angular';
import IAugmentedJQuery = angular.IAugmentedJQuery;

@Component({
  name: 'testComponent',
  template: '<span>{{$ctrl.name}}</span>'
})
export class TestComponent {
  name: string = 'hello';

  constructor(@Inject('$element') private $element: IAugmentedJQuery) {
  }

  $onInit(): void {
    this.$element.addClass('test-component');
  }
}
