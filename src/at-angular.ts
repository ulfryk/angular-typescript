import 'angular';
import 'ts-helpers';
import IModule = angular.IModule;
import IDirective = angular.IDirective;
import IComponentOptions = angular.IComponentOptions;

export function attachInjects(target: any, ...args: any[]): any {
  (target.$inject || []).forEach((item: string, index: number) => {
    target.prototype[item] = args[index];
  });
  return target;
}

export function Inject(...args: string[]) {
  return (target: any, key?: string, index?: number): void => {
    if (angular.isNumber(index)) {
      target.$inject = target.$inject || [];
      target.$inject[index] = args[0];
    } else {
      target.$inject = args;
    }
  };
}

export function Service() {
  return (target): void => {
    target.__$$declare = (module: IModule) => {
      module.service(target.name, target);
    };
  };
}

export function Controller() {
  return (target): void => {
    target.__$$declare = (module: IModule) => {
      module.controller(target.name, target);
    };
  };
}

export function Directive(config: IDirective) {
  return (target): void => {
    config.controller = target;
    target.__$$declare = (module: IModule) => {
      module.directive(config.name, () => (config));
    };
  };
}

export function Factory() {
  return (target: any): void => {
    function factory(...args: any[]): any {
      return attachInjects(target, ...args);
    }

    if (target.$inject && target.$inject.length > 0) {
      factory.$inject = target.$inject.slice(0);
    }
    target.__$$declare = (module: IModule) => {
      module.factory(target.name, factory);
    };
  };
}

export interface IComponentConfig extends IComponentOptions {
  name: string;
}

export function Component(config: IComponentConfig) {
  return (target: any): void => {
    config.controller = target;
    target.__$$declare = (module: IModule) => {
      module.component(config.name, config);
    };
  };
}

export function autoDeclare(name: string,
                            requires: string[],
                            injectables: Array<any>,
                            configFn?: Function): IModule {
  let module = angular.module(name, requires, configFn);
  injectables.forEach(injectable => {
    injectable.__$$declare(module);
  });
  return module;
}
