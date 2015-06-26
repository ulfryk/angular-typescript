
module app {

    'use strict';

    /* tslint:disable:no-any */
    /* istanbul ignore next */
    function combineResource(instance: any, model?: any): void {
        angular.extend(instance, new instance.$_Resource(angular.extend(instance, model)));
    }

    /* istanbul ignore next */
    export class Resource implements angular.resource.IResource<Resource> {
        public $promise : angular.IPromise<Resource>;
        public $resolved : boolean;
        public static get(): Resource { return new Resource(); }
        public static query(): Resource { return new Resource(); }
        public static remove(): Resource { return new Resource(); }
        public static save(): Resource { return new Resource(); }
        public static delete(): Resource { return new Resource(); }
        constructor(model?: any) {
            combineResource(this, model);
        }
        public $get(): angular.IPromise<Resource> { return this.$promise; }
        public $query(): angular.IPromise<Resource> { return this.$promise; }
        public $remove(): angular.IPromise<Resource> { return this.$promise; }
        public $save(): angular.IPromise<Resource> { return this.$promise; }
        public $delete(): angular.IPromise<Resource> { return this.$promise; }
    }

    /* istanbul ignore next */
    export class ResourceWithUpdate extends Resource  {
        public $promise : angular.IPromise<ResourceWithUpdate>;
        public static update(): ResourceWithUpdate { return new ResourceWithUpdate(); }
        public $update(): angular.IPromise<ResourceWithUpdate> { return this.$promise; }
    }

    export function resource(url: string, paramDefaults?: any, actionDescriptors?: any): IClassAnnotationDecorator {
        return (Target: any): void => {
            var newResource: angular.resource.IResourceClass<any> =
                angular.injector(['ngResource']).get('$resource')(url, paramDefaults, actionDescriptors);
            return angular.extend(Target, newResource, {
                prototype: angular.extend(Target.prototype, newResource.prototype, {$_Resource: newResource})
            });
        };
    }
    /* tslint:enable:no-any */

}
