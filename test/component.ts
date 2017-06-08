module test {

    'use strict';

    interface IFirstComponentScope extends angular.IScope {
        name: string;
    }

    @component('test', 'atTestComponent')
    export class TestComponentCtrl {

        // Static fields hold component configuration
        public static bindings: Object = {
            testBinding: '@'
        };
        public static template: string = '<h1>{{ $ctrl.testBinding }}</h1>';

        /* tslint:disable:no-empty */
        public static controller: Function = () => {
        };
        /* tslint:disable:no-empty */

        /* tslint:disable:member-ordering */
        public name: string;
        /* tslint:enable:member-ordering */

        // And the rest are simple Ctrl instance members

        constructor(
            @inject('$scope') $scope: IFirstComponentScope,
            /* tslint:disable:variable-name */
            @inject('$parse') private $$parse: angular.IParseService
            /* tslint:enable:variable-name */
        ) {
            $scope.name = 'Component';
        }

        public setCtrlName(name: string): void {
            this.$$parse('name').assign(this, name);
        }

    }

}
