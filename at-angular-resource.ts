/* istanbul ignore next */

module at {

    'use strict';
    import IPromise = angular.IPromise;
    import IResourceArray = angular.resource.IResourceArray;
    import IResource = angular.resource.IResource;

    /* tslint:disable:no-any */
    type ResourceClass = angular.resource.IResourceClass<any>;
    type ResourceArray = angular.resource.IResourceArray<any>;
    type ResourceService = angular.resource.IResourceService;

    /* istanbul ignore next */
    function combineResource(instance: any, model?: any): void {
        angular.extend(instance, new instance.$_Resource(model));
    }

    /* istanbul ignore next */
    export class Resource implements IResource<Resource> {

        static get: (params?: Object) => Resource;
        static query: (params?: Object) => ResourceArray;
        static remove: () => Resource;
        static save: () => Resource;
        static delete: () => Resource;
        $get: (params?: Object) => IPromise<this>;
        $query: (params?: Object) => IPromise<IResourceArray<this>>;
        $remove: (params?: Object) => IPromise<this>;
        $save: (params?: Object) => IPromise<this>;
        $delete: (params?: Object) => IPromise<this>;
        $promise: IPromise<this>;
        $resolved: boolean;
        toJSON: () => Resource;
        $cancelRequest: () => void;
        constructor(model?: any) { combineResource(this, model); }
    }

    /* istanbul ignore next */
    export class ResourceWithUpdate extends Resource  {
        static update: () => ResourceWithUpdate;
        $update: () => IPromise<this>;
        $promise : IPromise<this>;
        constructor(model?: any) { super(model); }
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
