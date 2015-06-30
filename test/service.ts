/* istanbul ignore if else */

module test {

    'use strict';

    @at.service('test', 'testServiceTwo')
    export class TestServiceTwo {

        public static $inject: string[] = ['$http', '$parse'];

        constructor(
            /* tslint:disable:variable-name */
            private $_$http: angular.IHttpService,
            private $_$parse: angular.IParseService
            /* tslint:enable:variable-name */
        ) {}

    }

}
