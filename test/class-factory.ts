module test {

    'use strict';

    @classFactory('test', 'TestClassOne')
    @inject('$http', '$parse')
    export class TestClassOne {

        public accept: string;

        /* tslint:disable:variable-name */
        private $$http: angular.IHttpService;
        private $$parse: angular.IParseService;
        /* tslint:enable:variable-name */

        constructor() {
            this.accept = this.$$parse('defaults.headers.common.Accept')(this.$$http);
        }

    }

}
