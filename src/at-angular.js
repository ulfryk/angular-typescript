(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'angular', 'ts-helpers'], factory);
    }
})(function (require, exports) {
    "use strict";
    require('angular');
    require('ts-helpers');
    function attachInjects(target) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        (target.$inject || []).forEach(function (item, index) {
            target.prototype[item] = args[index];
        });
        return target;
    }
    exports.attachInjects = attachInjects;
    function Inject() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        return function (target, key, index) {
            if (angular.isNumber(index)) {
                target.$inject = target.$inject || [];
                target.$inject[index] = args[0];
            }
            else {
                target.$inject = args;
            }
        };
    }
    exports.Inject = Inject;
    function Service() {
        return function (target) {
            target.__$$declare = function (module) {
                module.service(target.name, target);
            };
        };
    }
    exports.Service = Service;
    function Controller() {
        return function (target) {
            target.__$$declare = function (module) {
                module.controller(target.name, target);
            };
        };
    }
    exports.Controller = Controller;
    function Directive(config) {
        return function (target) {
            config.controller = target;
            target.__$$declare = function (module) {
                module.directive(config.name, function () { return (config); });
            };
        };
    }
    exports.Directive = Directive;
    function Factory() {
        return function (target) {
            function factory() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                return attachInjects.apply(void 0, [target].concat(args));
            }
            if (target.$inject && target.$inject.length > 0) {
                factory.$inject = target.$inject.slice(0);
            }
            target.__$$declare = function (module) {
                module.factory(target.name, factory);
            };
        };
    }
    exports.Factory = Factory;
    function Component(config) {
        return function (target) {
            config.controller = target;
            target.__$$declare = function (module) {
                module.component(config.name, config);
            };
        };
    }
    exports.Component = Component;
    function autoDeclare(name, requires, injectables, configFn) {
        var module = angular.module(name, requires, configFn);
        injectables.forEach(function (injectable) {
            injectable.__$$declare(module);
        });
        return module;
    }
    exports.autoDeclare = autoDeclare;
});

//# sourceMappingURL=at-angular.js.map
