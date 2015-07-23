/* istanbul ignore if else */

module test {

    'use strict';

    @service('test', 'testServiceTwo')
    export class TestServiceTwo {

        public static $inject: string[] = ['$http', '$parse'];

        constructor(
            /* tslint:disable:variable-name */
            private $$http: angular.IHttpService,
            private $$parse: angular.IParseService
            /* tslint:enable:variable-name */
        ) {}

    }

}
