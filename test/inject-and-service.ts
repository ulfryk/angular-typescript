/* istanbul ignore if */

module test {

    'use strict';

    @at.service('test', 'testServiceThree')
    @at.inject('$http', '$parse')
    export class TestServiceThree {

        private $$http: angular.IHttpService;
        private $$parse: angular.IParseService;

        constructor(
            $http: angular.IHttpService,
            $parse: angular.IParseService
        ) {
            this.$$http = $http;
            this.$$parse = $parse;
        }

    }

}
