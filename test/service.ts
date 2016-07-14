import {Service} from '../src/at-angular';

@Service()
export class TestServiceTwo {

  static $inject: string[] = ['$http', '$parse'];

  constructor(private $http: angular.IHttpService,
              private $parse: angular.IParseService) {
  }

}
