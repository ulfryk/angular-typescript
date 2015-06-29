/* istanbul ignore if */

module test {

    'use strict';

    @at.classFactory('test', 'TestClassOne')
    @at.inject('$http', '$parse')
    export class TestClassOne {

        public accept: string;

        /* tslint:disable:variable-name */
        private $_$http: angular.IHttpService;
        private $_$parse: angular.IParseService;
        /* tslint:enable:variable-name */

        constructor() {
            this.accept = this.$_$parse('defaults.headers.common.Accept')(this.$_$http);
        }

    }

}
