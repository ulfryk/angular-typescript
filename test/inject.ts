/* istanbul ignore if else */

module test {

    'use strict';

    @inject('$http', '$parse')
    export class TestServiceOne {

        constructor(
            /* tslint:disable:variable-name */
            private $_$http: angular.IHttpService,
            private $_$parse: angular.IParseService
            /* tslint:enable:variable-name */
        ) {}

    }

    angular.module('test').service('testServiceOne', TestServiceOne);

}
