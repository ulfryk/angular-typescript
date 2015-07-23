module test {

    'use strict';

    interface IFirstComponentScope extends angular.IScope {
        name: string;
    }

    @directive('test', 'atTestComponent')
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
            @inject('$scope') $scope: IFirstComponentScope,
            /* tslint:disable:variable-name */
            @inject('$parse') private $$parse: angular.IParseService
            /* tslint:enable:variable-name */
        ) {
            $scope.name = this.name = 'FirstTestCtrl';
        }

        public setCtrlName(name: string): void {
            this.$$parse('name').assign(this, name);
        }

    }

}
