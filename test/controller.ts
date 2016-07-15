import {Controller, Inject} from '../src/at-angular';
import IScope = angular.IScope;
import IParseService = angular.IParseService;

interface IFirstScope extends IScope {
  name: string;
}

@Controller()
@Inject('$scope', '$parse')
export class FirstTestCtrl {

  constructor($scope: IFirstScope,
              private $parse: IParseService) {
    $scope.name = 'FirstTestCtrl';
  }

}
