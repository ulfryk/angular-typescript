/* istanbul ignore if */

module test {

    'use strict';

    @at.inject('$http', '$parse')
    export class TestServiceOne {

        constructor(
            private $_$http: angular.IHttpService,
            private $_$parse: angular.IParseService
        ) {}

    }

    angular.module('test').service('testServiceOne', TestServiceOne);

}
