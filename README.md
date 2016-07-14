Angular-TypeScript
==================

[![GitHub version](https://badge.fury.io/gh/ulfryk%2Fangular-typescript.svg)](http://badge.fury.io/gh/ulfryk%2Fangular-typescript)
[![Build Status](https://travis-ci.org/ulfryk/angular-typescript.svg)](https://travis-ci.org/ulfryk/angular-typescript)
[![Coverage Status](https://coveralls.io/repos/ulfryk/angular-typescript/badge.svg?branch=master)](https://coveralls.io/r/ulfryk/angular-typescript?branch=master)


[![npm version](https://badge.fury.io/js/angular-typescript.svg)](http://badge.fury.io/js/angular-typescript)
[![Dependency Status](https://www.versioneye.com/user/projects/5591b8f9396561001900009b/badge.svg?style=flat)](https://www.versioneye.com/user/projects/5591b8f9396561001900009b)


[![Bower version](https://badge.fury.io/bo/angular-typescript.svg)](http://badge.fury.io/bo/angular-typescript)
[![Dependency Status](https://www.versioneye.com/user/projects/5591b93039656100200000a9/badge.svg?style=flat)](https://www.versioneye.com/user/projects/5591b93039656100200000a9)



> TypeScript 1.8+ annotations (decorators) for AngularJS 1.5.x 

What ?
------

**angular-typescript** provides annotation like decorators:

```
@Service()
@Inject(dependencyOne: string, ...dependencies?: string[])
@Controller()
@Directive(config: IDirectiveConfig)
@Factory()
@Resource()
@Component(config: IComponentConfig) 
```

Why ?
-----

Purpose of those decorators is to remove some ugly boilerplate from AngularJS applications written in TypeScript.

How ?
-----

### Service

Without annotations we have to:

```typescript
//# some.service.ts

export class SomeService {

    constructor() {
        // do stuff $http and $parse
    }
    
    public someMethod(anArg: number): boolean {
        // do some stuff
    }

}
```

and in the main module:

```typescript
//# some.module.ts

import {SomeService} from 'some.service.ts';

export someModule = angular.module('someModule', []).service('someService', SomeService);
```

Using **angular-typescript** it will look like:

```typescript
@Service()
export class SomeService {

    constructor() {
        // do stuff
    }
    
    public someMethod(anArg: number): boolean {
        // do some stuff
    }

}
```

and in the main module:

```typescript
//# some.module.ts

import {SomeService} from 'some.service.ts';

export someModule = autoDeclare('someModule', [], [SomeService]);
```

***

### Inject

Without annotations we have to:

```typescript
export class SomeService {
    // this line is error prome doubt to we should keep the same order as in the constructor
    static $inject = ['$http', '$parse'];

    constructor(
        private $http: angular.IHttpService,
        private $parse: angular.IParseService
    ) {
        // do stuff with $http and $parse;
    }
    
    public someMethod(anArg: number): boolean {
        // do some stuff with this.$parse
    }

}
```

and in the main module:

```typescript
//# some.module.ts

import {SomeService} from 'some.service.ts';

export someModule = angular.module('someModule', []).service('someService', SomeService);
```

Using **angular-typescript** it will look like:

```typescript
@Service()
export class SomeService {

    constructor(
        @Inject('$http') $http: angular.IHttpService,
        @Inject('$parse') private $parse: angular.IParseService
    ) {
        // do stuff with $http and $parse;
    }
    
    public someMethod(anArg: number): boolean {
        // do some stuff with this.$parse
    }

}
```

or

```typescript
@Service()
@Inject('$http', '$parse') // still error prone
export class SomeService {

    constructor(
        private $http: angular.IHttpService, 
        private $parse: angular.IParseService
    ) {
        // do stuff with $http and $parse;
    }
    
    public someMethod(anArg: number): boolean {
        // do some stuff with this.$parse();
    }

}
```

and in the main module:

```typescript
//# some.module.ts

import {autoDeclare} from 'angular-typescript/at-angular';
import {SomeService} from 'some.service.ts';

export someModule = autoDeclare('someModule', [], [SomeService]);
```

***

### Controller

Without annotations we have to:

```typescript
//# some.controller.ts

export class SomeController {

    static $inject = ['$scope', '$parse'];

    constructor(
        private $scope: IScope,
        private $parse: IParseService
    ) {
        // do stuff with $scope and $$parse;
    }
    
    public someMethod(anArg: number): boolean {
        // do some stuff with this.$$parse();
    }
}
```

and in the main module:

```typescript
//# some.module.ts

import {SomeService} from 'some.service.ts';

export someModule = angular.module('someModule', []).service('someController', SomeController);
```

Using **angular-typescript** it will look like:

```typescript
@Controller()
export class SomeController {

    constructor(
        @inject('$scope') private $scope: angular.IScope,
        @inject('$parse') private $parse: angular.IParseService
    ) {
        // do stuff with $scope and $$parse;
    }
    
    public someMethod(anArg: number): boolean {
        // do some stuff with this.$$parse();
    }
}
```

and in the main module:

```typescript
//# some.module.ts

import {SomeService} from 'some.service.ts';

export someModule = autoDeclare('someModule', [], [SomeController]);
```

***

### Directive

Without annotations we have to do:

```typescript
//# test.dircetive.ts

class TestDirective {

  // And the rest are simple Ctrl instance members
  name: string;

  constructor(private $scope: IFirstComponentScope,
              private $parse: IParseService) {
    $scope.name = this.name = 'FirstTestCtrl';
  }

  setCtrlName(name: string): void {
    this.$parse('name').assign(this, name);
  }
}

export const testDirectiveConfig = {
  name: 'testDirective',
  restrict: 'E',
  link: (scope, element, attrs, ctrl: TestDirective) => {
    element.addClass('test-component');
    ctrl.setCtrlName('FAKE_CTRL_NAME');
  },
  controller: TestDirective
  controllerAs: 'ctrl',
  template: '<span>{{ name }}</span><span>{{ ctrl.name }}</span>'
};
```

and in the main module:

```typescript
//# some.module.ts

import {SomeService} from 'some.service.ts';

export someModule = angular.module('someModule', []).service('testDirective', testDirectiveConfig);
```

Using **angular-typescript** it will look like:

```typescript

@Directive({
  name: 'testDirective',
  restrict: 'E',
  link: (scope, element, attrs, ctrl: TestDirective) => {
    element.addClass('test-component');
    ctrl.setCtrlName('FAKE_CTRL_NAME');
  },
  controllerAs: 'ctrl',
  template: '<span>{{ name }}</span><span>{{ ctrl.name }}</span>'
})
export class TestDirective {

  // And the rest are simple Ctrl instance members
  name: string;

  constructor(@Inject('$scope') private $scope: IFirstComponentScope,
              @Inject('$parse') private $parse: IParseService) {
    $scope.name = this.name = 'FirstTestCtrl';
  }

  setCtrlName(name: string): void {
    this.$parse('name').assign(this, name);
  }
}
```

and in the main module:

```typescript
//# some.module.ts

import {TestDirective} from 'test.directive.ts';

export someModule = autoDeclare('someModule', [], [TestDirective]);
```

***

### Factory

If you use constructors/classes to create common entities a `@ClassFactory` can be useful.
It passes constructor as angular service and attaches `$inject`'s to it's prototype with leading `$`.

```typescript
//# test.factory.ts

import {Factory, Inject} from '../src/at-angular';
import IParseService = angular.IParseService;
import IHttpService = angular.IHttpService;

@Factory()
@Inject('$http', '$parse')
export class TestFactory {

  public accept: string;

  $http: IHttpService;
  $parse: IParseService;

  constructor() {
    this.accept = this.$parse('defaults.headers.common.Accept')(this.$http);
  }
}

```

then somewhere else:

```typescript
    …
    constructor() {
        this.testFactory = new TestFactory();
    }
    …
```

and finally in the main module:

```typescript
//# some.module.ts

import {TestFactory} from 'test.factory.ts';

export someModule = autoDeclare('someModule', [], [TestFactory]);
```

***

### Resource

This one is somehow similar to `@ClassFactory`, but it also encapsulates magic powers of angular `$resource`.
 `$resource` configs are gathered from static class members.

```typescript
//# user.resource.ts

import {Resource, BaseResource} from "../src/at-angular-resource";
import {Inject} from "../src/at-angular";
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
```

***

