/* istanbul ignore if else */

module test {

    'use strict';

    @service('test')
    export class TestServiceFive {
        private name: string;

        constructor() {
            this.name = 'TestServiceFive';
        }

        getName(): string {
            return this.name;
        }
    }

    @decorator('test', 'TestServiceFive')
    export class TestDecorator {
        private name: string;
        constructor(
            /* tslint:disable:variable-name */
            @inject('$delegate') private $delegate: TestServiceFive
            /* tslint:enable:variable-name */
        ) {}

        changeName(): void {
            this.name = 'TestServiceFiveDecorated';
        }
    }

}
