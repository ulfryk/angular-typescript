/* istanbul ignore next */

module test {

    'use strict';

    interface ITestModel {
        name: string;
        age: number;
    }

    @resource('test', 'TestResourceOne')
    @inject('$http', '$parse')
    export class TestResourceOne implements ITestModel {
        // And to keep proper type, you may add "extends at.Resource"

        public static url: string = '/fake/url';

        public name: string;
        public age: number;

        /* tslint:disable:variable-name */
        private $$http: angular.IHttpService;
        private $$parse: angular.IParseService;
        /* tslint:enable:variable-name */

        constructor(model?: ITestModel) {
            /* istanbul ignore else */
            if (model) {
                this.name = model.name;
                this.age = model.age;
            }
        }

        public getLabel(): string {
            return this.$$parse('defaults.headers.common.Accept')(this.$$http) + this.name + String(this.age);
        }

    }

}
