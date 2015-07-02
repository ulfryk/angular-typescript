Angular-TypeScript
==================

[![GitHub version](https://badge.fury.io/gh/ulfryk%2Fangular-typescript.svg)](http://badge.fury.io/gh/ulfryk%2Fangular-typescript)
[![Build Status](https://travis-ci.org/ulfryk/angular-typescript.svg)](https://travis-ci.org/ulfryk/angular-typescript)
[![Coverage Status](https://coveralls.io/repos/ulfryk/angular-typescript/badge.svg?branch=master)](https://coveralls.io/r/ulfryk/angular-typescript?branch=master)


[![npm version](https://badge.fury.io/js/angular-typescript.svg)](http://badge.fury.io/js/angular-typescript)
[![Dependency Status](https://www.versioneye.com/user/projects/5591b8f9396561001900009b/badge.svg?style=flat)](https://www.versioneye.com/user/projects/5591b8f9396561001900009b)


[![Bower version](https://badge.fury.io/bo/angular-typescript.svg)](http://badge.fury.io/bo/angular-typescript)
[![Dependency Status](https://www.versioneye.com/user/projects/5591b93039656100200000a9/badge.svg?style=flat)](https://www.versioneye.com/user/projects/5591b93039656100200000a9)



> TypeScript 1.5 annotations (decorators) for AngularJS 1.x 

What ?
------

**angular-typescript** provides annotation like decorators:

```
@at.service(moduleName: string, serviceName: string)
@at.inject(dependencyOne: string, ...dependencies?: string[])
@at.controller(moduleName: string, controllerName: string)
@at.directive(moduleName: string, directiveName: string)
@at.classFactory(moduleName: string, className: string)
@at.resource(moduleName: string, resourceClassName: string)
```

Why ?
-----

Purpose of those decorators is to remove some ugly boilerplate from AngularJS applications written in TypeScript.

How ?
-----

### Service

No one have to:

```typescript
class SomeService {

    constructor() {
        // do stuff
    }
    
    public someMethod(anArg: number): boolean {
        // do some stuff
    }

}

angular.module('ngModuleName').service('someService', SomeService);
```

Using **angular-typescript** it will look like:

```typescript
@service('ngModuleName', 'someService')
class SomeService {

    constructor() {
        // do stuff
    }
    
    public someMethod(anArg: number): boolean {
        // do some stuff
    }

}
```

***

### Inject

```typescript
@service('ngModuleName', 'someServiceName')
class SomeService {

    constructor(
        @inject('$http') $http: angular.IHttpService,
        @inject('$parse') private $$parse: angular.IParseService
    ) {
        // do stuff with $http and $$parse;
    }
    
    public someMethod(anArg: number): boolean {
        // do some stuff with this.$$parse();
    }

}
```

or

```typescript
@service('ngModuleName', 'someServiceName')
@inject('$http', '$parse')
class SomeService {

    constructor($http: angular.IHttpService, private $$parse: angular.IParseService) {
        // do stuff with $http and $$parse;
    }
    
    public someMethod(anArg: number): boolean {
        // do some stuff with this.$$parse();
    }

}
```

***

### Controller


```typescript
@controller('ngModuleName', 'SomeController')
class SomeController {

    constructor(
        @inject('$scope') $scope: angular.IScope,
        @inject('$parse') private $$parse: angular.IParseService
    ) {
        // do stuff with $scope and $$parse;
    }
    
    public someMethod(anArg: number): boolean {
        // do some stuff with this.$$parse();
    }

}
```

***

### Directive



```typescript
@directive('ngModuleName', 'atSomeDirective')
class SomeDirectiveController {

    public static controllerAs: 'someDirectiveCtrl';
    public static templateUrl: string = '/partials/some-directive.html';
    public static link: angular.IDirectiveLinkFn = (scope, element, attrs, ctrl: SomeDirectiveController) => {
        ctrl.init(attrs.atSomeDirective);
    };

    constructor(
        @inject('$scope') private $$scope: angular.IScope,
        @inject('$parse') private $$parse: angular.IParseService
    ) {
        // do stuff with $$scope and $$parse;
    }
    
    public init(anArg: string): boolean {
        // do some stuff with this.$$parse and this.$$scope
    }

}
```

***

### ClassFactory

```typescript
@classFactory('test', 'Headers')
@inject('$http', '$parse')
class Headers {

    public accept: string;

    private $_$http: angular.IHttpService;
    private $_$parse: angular.IParseService;

    constructor() {
        this.accept = this.$_$parse('defaults.headers.common.Accept')(this.$_$http);
    }

}
```

and the somewhere else:

```typescript
    …
    constructor(
        @inject('Headers') Headers: Headers
    ) {
        this.headers = new Headers();
    }
    …
```

***

### Resource

```typescript
@resource('test', 'UserResource')
@inject('$http', '$parse')
class UserResource extends at.Resource {

    public static url: string = '/fake/url';

    public name: string;
    public age: number;

    private $_$parse: angular.IParseService;

    constructor(model?: ITestModel) {
        if (model) {
            this.name = model.name;
            this.age = model.age;
        }
    }

    public getLabel(): string {
        return `${ this.name }-${ String(this.age) }`;
    }

}
```

***

