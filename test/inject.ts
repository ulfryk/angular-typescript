import {Inject, Service} from '../src/at-angular';
import IParseService = angular.IParseService;
import IHttpService = angular.IHttpService;

@Service()
@Inject('$http', '$parse')
export class TestServiceOne {

  constructor(private $http: IHttpService,
              private $parse: IParseService) {
  }

}
