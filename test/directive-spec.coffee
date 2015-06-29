'use strict';

describe 'annotations:', ->

  beforeEach module 'test'

  describe '@directive (with @inject)', ->
    $scope = null
    element = null

    beforeEach inject ($compile, $rootScope) ->
      $scope = $rootScope.$new()
      element = $compile('<at-test-component></at-test-component>')($scope)
      $rootScope.$digest()

    it 'should be defined', ->

      expect at.directive
      .toEqual jasmine.any Function

    it 'should instantiate decorated class as new service', ->

      expect element
      .toBeDefined()

      expect $scope.ctrl
      .toEqual jasmine.any test.TestComponentCtrl

    it 'should assign proper $inject array to service constructor', ->

      expect test.TestComponentCtrl.$inject
      .toEqual ['$scope', '$parse']

    it 'should execute directive on element', ->

      expect element.hasClass 'test-component'
      .toBe true

      expect $scope.name
      .toBe 'FirstTestCtrl'

      expect $scope.ctrl.name
      .toBe 'FAKE_CTRL_NAME'

      expect element.text()
      .toBe $scope.name + $scope.ctrl.name


