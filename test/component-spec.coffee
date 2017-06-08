'use strict';

describe 'annotations:', ->

  beforeEach module 'test'

  describe '@component (with @inject)', ->
    $scope = null
    element = null
    controller = null

    beforeEach inject ($compile, $componentController, $rootScope) ->
      $scope = $rootScope.$new()
      element = $compile(angular.element('<at-test-component test-binding="{{ outside }}"></at-test-component>'))($scope)
      controller = $componentController('atTestComponent', {$scope: $scope})
      $scope.outside = 'angular 1.5 component'
      $rootScope.$digest()

    it 'should be defined', ->

      expect element
        .toBeDefined()

      expect controller
        .toBeDefined()

      expect at.component
        .toEqual jasmine.any Function

    it 'should assign proper $inject array to service constructor', ->

      expect test.TestComponentCtrl.$inject
        .toEqual ['$scope', '$parse']

    it 'should execute Angular Component on element', ->

      expect element.find('h1').text()
        .toBe 'angular 1.5 component'
