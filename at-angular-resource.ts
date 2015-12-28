/* istanbul ignore next */

module at {

    'use strict';

    /* tslint:disable:no-any */
    type ResourceClass = angular.resource.IResourceClass<any>;
    type ResourceArray = angular.resource.IResourceArray<any>;
    type ResourceService = angular.resource.IResourceService;

    /* istanbul ignore next */
    function combineResource(instance: any, model?: any): void {
        angular.extend(instance, new instance.$_Resource(model));
    }

    /* istanbul ignore next */
    export class Resource implements angular.resource.IResource<Resource> {
        public static get: (params?: Object) => Resource;
        public static query: (params?: Object) => ResourceArray;
        public static remove: () => Resource;
        public static save: () => Resource;
        public static delete: () => Resource;
        constructor(model?: any) { combineResource(this, model); }
        public $get: (params?: Object) => angular.IPromise<this>;
        public $query: (params?: Object) => angular.IPromise<angular.resource.IResourceArray<this>>;
        public $remove: (params?: Object) => angular.IPromise<this>;
        public $save: (params?: Object) => angular.IPromise<this>;
        public $delete: (params?: Object) => angular.IPromise<this>;
        public $promise: angular.IPromise<this>;
        public $resolved: boolean;
        public toJSON: () => {
            [index: string]: any;
        };
    }

    /* istanbul ignore next */
    export class ResourceWithUpdate extends Resource  {
        constructor(model?: any) { super(model); }
        public static update: () => ResourceWithUpdate;
        public $update: () => angular.IPromise<this>;
        public $promise : angular.IPromise<this>;
    }

    export interface IResourceAnnotation {
        (moduleName: string, className: string): IClassAnnotationDecorator;
    }

    export function resource(moduleName: string, className: string): IClassAnnotationDecorator {
        return (target: any): void => {
            function resourceClassFactory($resource: ResourceService, ...args: any[]): any {
                const newResource: ResourceClass = $resource(target.url, target.params, target.actions, target.options);
                return attachInjects(angular.extend(newResource, angular.extend(target, newResource, {
                    prototype: angular.extend(newResource.prototype, angular.extend(target.prototype, {
                        /* tslint:disable:variable-name */
                        $_Resource: newResource
                        /* tslint:enable:variable-name */
                    }))
                })), ...args);
            }
            resourceClassFactory.$inject = (['$resource']).concat(target.$inject /* istanbul ignore next */ || []);
            angular.module(moduleName).factory(className, resourceClassFactory);
        };
    }
    /* tslint:enable:no-any */

}
