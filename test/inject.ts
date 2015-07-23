module test {

    'use strict';

    @inject('$http', '$parse')
    export class TestServiceOne {

        constructor(
            /* tslint:disable:variable-name */
            private $$http: angular.IHttpService,
            private $$parse: angular.IParseService
            /* tslint:enable:variable-name */
        ) {}

    }

    angular.module('test').service('testServiceOne', TestServiceOne);

}
