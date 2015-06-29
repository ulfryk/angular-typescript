/* istanbul ignore if */

module test {

    'use strict';

    interface IFirstComponentScope extends angular.IScope {
        name: string;
    }

    @at.directive('test', 'atTestComponent')
    @at.inject('$scope', '$parse')
    export class TestComponentCtrl {

        // Static fields hold directive configuration
        public static controller: string = 'TestComponentCtrl as ctrl';

        public static link: angular.IDirectiveLinkFn = (
            scope: IFirstComponentScope,
            element: angular.IAugmentedJQuery,
            attrs: angular.IAttributes,
            ctrl: TestComponentCtrl
        ) => {
            ctrl.setCtrlName('FAKE_CTRL_NAME');
        };

        public static restrict: string = 'E';

        public static template: angular.IDirectiveCompileFn = (tElement: angular.IAugmentedJQuery) => {
            tElement.addClass('test-component');
            return '<span>{{ name }}</span><span>{{ ctrl.name }}</span>';
        };

        // And the rest are simple Ctrl instance members
        public name: string;

        constructor(
            $scope: IFirstComponentScope,
            /* tslint:disable:variable-name */
            private $_$parse: angular.IParseService
            /* tslint:enable:variable-name */
        ) {
            $scope.name = this.name = 'FirstTestCtrl';
        }

        public setCtrlName(name: string): void {
            this.$_$parse('name').assign(this, name);
        }

    }

}
