/* istanbul ignore if */

module test {

    'use strict';

    interface IFirstScope extends angular.IScope {
        name: string;
    }

    @at.controller('test', 'FirstTestCtrl')
    @at.inject('$scope', '$parse')
    export class FirstTestCtrl {

        constructor(
            $scope: IFirstScope,
            private $_$parse: angular.IParseService
        ) {
            $scope.name = 'FirstTestCtrl';
        }

    }

}
