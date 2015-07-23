module test {

    'use strict';

    interface IFirstScope extends angular.IScope {
        name: string;
    }

    @controller('test', 'FirstTestCtrl')
    @inject('$scope', '$parse')
    export class FirstTestCtrl {

        constructor(
            $scope: IFirstScope,
            /* tslint:disable:variable-name */
            private $$parse: angular.IParseService
            /* tslint:enable:variable-name */
        ) {
            $scope.name = 'FirstTestCtrl';
        }

    }

}
