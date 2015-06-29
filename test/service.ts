/* istanbul ignore if */

module test {

    'use strict';

    @at.service('test', 'testServiceTwo')
    export class TestServiceTwo {

        public static $inject: string[] = ['$http', '$parse'];

        constructor(
            private $_$http: angular.IHttpService,
            private $_$parse: angular.IParseService
        ) {}

    }

}
