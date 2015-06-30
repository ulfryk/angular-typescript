
module at {

    'use strict';

    const directiveProperties: string[] = [
        'compile',
        'controller',
        'controllerAs',
        'bindToController',
        'link',
        'name',
        'priority',
        'replace',
        'require',
        'restrict',
        'scope',
        'template',
        'templateUrl',
        'terminal',
        'transclude'
    ];

    /* tslint:disable:no-any */
    export interface IClassAnnotationDecorator {
        (target: any): void;
    }

    function instantiate(moduleName: string, name: string, mode: string): IClassAnnotationDecorator {
        return (target: any): void => {
            angular.module(moduleName)[mode](name, target);
        };
    }

    export function attachInjects(target: any, ...args: any[]): any {
        (target.$inject || []).forEach((item: string, index: number) => {
            target.prototype['$_' + item] = args[index];
        });
        return target;
    }

    export function inject(...args: string[]): at.IClassAnnotationDecorator {
        return (target: any): void => {
            target.$inject = args;
        };
    }

    export function service(moduleName: string, serviceName: string): at.IClassAnnotationDecorator {
        return instantiate(moduleName, serviceName, 'service');
    }

    export function controller(moduleName: string, ctrlName: string): at.IClassAnnotationDecorator {
        return instantiate(moduleName, ctrlName, 'controller');
    }

    export function directive(moduleName: string, directiveName: string): at.IClassAnnotationDecorator {
        return (target: any): void => {
            var config: angular.IDirective;
            /* istanbul ignore else */
            if (target.controller) {
                controller(moduleName, target.controller.split(' ').shift())(target);
            }
            config = directiveProperties.reduce((
                config: angular.IDirective,
                property: string
            ) => {
                return angular.isDefined(target[property]) ? angular.extend(config, {[property]: target[property]}) :
                    config; /* istanbul ignore next */
            }, {controller: target, scope: Boolean(target.templateUrl)});

            angular.module(moduleName).directive(directiveName, () => (config));
        };
    }

    export function classFactory(moduleName: string, className: string): at.IClassAnnotationDecorator {
        return (target: any): void => {
            function factory(...args: any[]): any {
                return at.attachInjects(target, ...args);
            }
            /* istanbul ignore else */
            if (target.$inject && target.$inject.length > 0) {
                factory.$inject = target.$inject.slice(0);
            }
            angular.module(moduleName).factory(className, factory);
        };
    }
    /* tslint:enable:no-any */

}
