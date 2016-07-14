import 'angular-resource';
import IPromise = angular.IPromise;
import IResourceArray = angular.resource.IResourceArray;
import IResource = angular.resource.IResource;
import {attachInjects} from './at-angular';
import IModule = angular.IModule;
import IResourceService = angular.resource.IResourceService;
import IResourceClass = angular.resource.IResourceClass;

function combineResource(instance: any, model?: any): void {
  angular.extend(instance, new instance.$_Resource(model));
}

/* istanbul ignore next */
export class BaseResource implements IResource<BaseResource> {
  static get: (params?: Object) => BaseResource;
  static query: (params?: Object) => IResourceArray<any>;
  static remove: () => BaseResource;
  static save: () => BaseResource;
  static delete: () => BaseResource;
  $get: (params?: Object) => IPromise<this>;
  $query: (params?: Object) => IPromise<IResourceArray<this>>;
  $remove: (params?: Object) => IPromise<this>;
  $save: (params?: Object) => IPromise<this>;
  $delete: (params?: Object) => IPromise<this>;
  $promise: IPromise<this>;
  $resolved: boolean;
  $cancelRequest: () => void;
  toJSON: () => this;

  constructor(model?: any) {
    combineResource(this, model);
  }
}

/* istanbul ignore next */
export class ResourceWithUpdate extends BaseResource {
  static update: () => ResourceWithUpdate;
  $update: () => IPromise<this>;
  $promise: IPromise<this>;

  constructor(model?: any) {
    super(model);
  }
}

export function Resource() {
  return (target: any): void => {
    function resourceClassFactory($resource: IResourceService, ...args: any[]): any {
      const newResource: IResourceClass<any> = $resource(target.url, target.params, target.actions, target.options);
      return attachInjects(angular.extend(newResource, angular.extend(target, newResource, {
        prototype: angular.extend(newResource.prototype, angular.extend(target.prototype, {
          /* tslint:disable:variable-name */
          $_Resource: newResource
          /* tslint:enable:variable-name */
        }))
      })), ...args);
    }

    resourceClassFactory.$inject = (['$resource']).concat(target.$inject /* istanbul ignore next */ || []);
    target.__$$declare = (module: IModule) => {
      module.factory(target.name, resourceClassFactory);
    };
  };
}
