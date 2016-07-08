/* istanbul ignore next */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var at;
(function (at) {
    'use strict';
    /* istanbul ignore next */
    function combineResource(instance, model) {
        angular.extend(instance, new instance.$_Resource(model));
    }
    /* istanbul ignore next */
    var Resource = (function () {
        function Resource(model) {
            combineResource(this, model);
        }
        return Resource;
    }());
    at.Resource = Resource;
    /* istanbul ignore next */
    var ResourceWithUpdate = (function (_super) {
        __extends(ResourceWithUpdate, _super);
        function ResourceWithUpdate(model) {
            _super.call(this, model);
        }
        return ResourceWithUpdate;
    }(Resource));
    at.ResourceWithUpdate = ResourceWithUpdate;
    function resource(moduleName, className) {
        return function (target) {
            function resourceClassFactory($resource) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                var newResource = $resource(target.url, target.params, target.actions, target.options);
                return at.attachInjects.apply(void 0, [angular.extend(newResource, angular.extend(target, newResource, {
                    prototype: angular.extend(newResource.prototype, angular.extend(target.prototype, {
                        /* tslint:disable:variable-name */
                        $_Resource: newResource
                    }))
                }))].concat(args));
            }
            resourceClassFactory.$inject = (['$resource']).concat(target.$inject /* istanbul ignore next */ || []);
            angular.module(moduleName).factory(className, resourceClassFactory);
        };
    }
    at.resource = resource;
})(at || (at = {}));
//# sourceMappingURL=at-angular-resource.js.map