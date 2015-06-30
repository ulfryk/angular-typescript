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
@at.service('ngModuleName', 'someService')
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

…

***

### Controller

…

***

### Directive

…

***

### ClassFactory

…

***

### Resource

…

***

