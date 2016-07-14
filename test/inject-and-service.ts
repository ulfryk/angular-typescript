import {Service, Inject} from '../src/at-angular';
import IHttpService = angular.IHttpService;
import IParseService = angular.IParseService;

@Service()
export class TestServiceThree {

  constructor(@Inject('$http') private $http: IHttpService,
              @Inject('$parse') private $parse: IParseService) {
  }

}
