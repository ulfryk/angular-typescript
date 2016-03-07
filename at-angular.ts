
module at {

    'use strict';

    const directiveProperties: string[] = [
        'compile',
        'controller',
        'controllerAs',
        'bindToController',
        'link',
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
        (t: any, key: string, index: number): void;
    }

    function getFuncName(target: any): string {
        return target.name || target.toString().match(/^function\s*([^\s(]+)/)[1];
    }

    function instantiate(moduleName: string, mode: string, name?: string): IClassAnnotationDecorator {
        return (target: any): void => {
            let fnName: string = getFuncName(target);
            angular.module(moduleName)[mode](name || fnName, target);
        };
    }

    export function attachInjects(target: any, ...args: any[]): any {
        (target.$inject || []).forEach((item: string, index: number) => {
            target.prototype[(item.charAt(0) === '$' ? '$' : '$$') + item] = args[index];
        });
        return target;
    }

    export interface IInjectAnnotation {
        (...args: any[]): IClassAnnotationDecorator;
    }

    export function inject(...args: string[]): at.IClassAnnotationDecorator {
        return (target: any, key?: string, index?: number): void => {
            if (angular.isNumber(index)) {
                target.$inject = target.$inject || [];
                target.$inject[index] = args[0];
            } else {
                target.$inject = args;
            }
        };
    }

    export interface IServiceAnnotation {
        (moduleName: string, serviceName: string): IClassAnnotationDecorator;
    }

    export function service(moduleName: string, serviceName?: string): at.IClassAnnotationDecorator {
        return instantiate(moduleName, 'service', serviceName);
    }

    export interface IControllerAnnotation {
        (moduleName: string, ctrlName: string): IClassAnnotationDecorator;
    }

    export function controller(moduleName: string, ctrlName?: string): at.IClassAnnotationDecorator {
        return instantiate(moduleName, 'controller', ctrlName);
    }

    export interface IDirectiveAnnotation {
        (moduleName: string, directiveName: string): IClassAnnotationDecorator;
    }

    export interface IDirectiveProperties extends angular.IDirective {
        selector: string;
    }

    export function directive(
        moduleName: string,
        directiveSettings:  string|IDirectiveProperties
    ): at.IClassAnnotationDecorator {

        return (target: any): void => {

            let config: IDirectiveProperties;
            const ctrlName: string = angular.isString(target.controller)
                ? target.controller.split(' ').shift()
                : null;

            if (typeof directiveSettings === 'string') {

                // Retrocompatibilty

                config = directiveProperties
                    .reduce((config: angular.IDirective, property: string) => {
                        return angular.isDefined(target[property]) ?
                            angular.extend(config, {[property]: target[property]}) : config;
                        }, {
                            controller: target
                    });

                config.selector = directiveSettings;

            } else {

                // Generate config from Annotation configuration

                config = <IDirectiveProperties> angular.copy(directiveSettings);

                // Store FuncName as ControllerAs
                config.controllerAs = getFuncName(target);
                config.controller = target;

                angular.forEach(directiveProperties, function(property: string): any {
                    if (angular.isDefined(target[property])) {
                        config[property] = target[property];
                    }
                });
            }

            /* istanbul ignore else */
            if (ctrlName) {
                controller(moduleName, ctrlName)(target);
            }

            angular
                .module(moduleName)
                .directive(config.selector, () => (config));
        };
    }

    export interface IClassFactoryAnnotation {
        (moduleName: string, className: string): IClassAnnotationDecorator;
    }

    export function classFactory(moduleName: string, className?: string): at.IClassAnnotationDecorator {

        return (target: any): void => {
            function factory(...args: any[]): any {
                return at.attachInjects(target, ...args);
            }
            /* istanbul ignore else */
            if (target.$inject && target.$inject.length > 0) {
                factory.$inject = target.$inject.slice(0);
            }
            angular.module(moduleName).factory(className || getFuncName(target), factory);
        };
    }

    export function decorator(moduleName: string, targetProvider: string): at.IClassAnnotationDecorator {

        return (targetClass: any): void => {

            angular
                .module(moduleName)
                .config([
                    '$provide',
                    function($provide: angular.auto.IProvideService): void {

                    $provide.decorator(targetProvider, [
                       '$delegate',
                        ($delegate: any): void => {

                            $delegate[targetProvider] = $delegate;

                            angular.extend($delegate, new targetClass());

                            return $delegate;
                        }
                    ]);

                }]);

        };

    }
    /* tslint:enable:no-any */

}
