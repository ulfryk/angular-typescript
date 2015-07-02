module test {

    'use strict';

    @service('test', 'testServiceThree')
    export class TestServiceThree {

        constructor(
            @inject('$http') private $$http: angular.IHttpService,
            @inject('$parse') private $$parse: angular.IParseService
        ) {}

    }

}
