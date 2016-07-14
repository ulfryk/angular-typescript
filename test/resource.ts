import {Resource, BaseResource} from '../src/at-angular-resource';
import {Inject} from '../src/at-angular';
import IHttpService = angular.IHttpService;
import IParseService = angular.IParseService;

interface IUser {
  name: string;
  age: number;
}

@Resource()
@Inject('$http', '$parse')
export class UserResource extends BaseResource implements IUser {
  // And to keep proper type, you may add "extends at.Resource"

  static url: string = '/fake/url';

  name: string;
  age: number;

  private $http: IHttpService;
  private $parse: IParseService;

  constructor(model?: IUser) {
    super(model);
    /* istanbul ignore else */
    if (model) {
      this.name = model.name;
      this.age = model.age;
    }
  }

  getLabel(): string {
    return this.$parse('defaults.headers.common.Accept')(this.$http) + this.name + String(this.age);
  }

}
