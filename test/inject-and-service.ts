/* istanbul ignore if */

module test {

    'use strict';

    @at.service('test', 'testServiceThree')
    @at.inject('$http', '$parse')
    export class TestServiceThree {

        constructor(
            private $$http: angular.IHttpService,
            private $$parse: angular.IParseService
        ) {}

    }

}
