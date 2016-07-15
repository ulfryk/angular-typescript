import {Factory, Inject} from '../src/at-angular';
import IParseService = angular.IParseService;
import IHttpService = angular.IHttpService;

@Factory()
@Inject('$http', '$parse')
export class TestFactory {

  public accept: string;

  $http: IHttpService;
  $parse: IParseService;

  constructor() {
    this.accept = this.$parse('defaults.headers.common.Accept')(this.$http);
  }
}
