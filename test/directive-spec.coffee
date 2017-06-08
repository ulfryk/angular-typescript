'use strict';

describe 'annotations:', ->

  beforeEach module 'test'

  describe '@directive (with @inject)', ->
    $scope = null
    element = null

    beforeEach inject ($compile, $rootScope) ->
      $scope = $rootScope.$new()
      element = $compile('<at-test-directive></at-test-directive>')($scope)
      $rootScope.$digest()

    it 'should be defined', ->

      expect at.directive
      .toEqual jasmine.any Function

    it 'should instantiate decorated class as new service', ->

      expect element
      .toBeDefined()

      expect $scope.ctrl
      .toEqual jasmine.any test.TestDirectiveCtrl

    it 'should assign proper $inject array to service constructor', ->

      expect test.TestDirectiveCtrl.$inject
      .toEqual ['$scope', '$parse']

    it 'should execute directive on element', ->

      expect element.hasClass 'test-directive'
      .toBe true

      expect $scope.name
      .toBe 'FirstTestCtrl'

      expect $scope.ctrl.name
      .toBe 'FAKE_CTRL_NAME'

      expect element.text()
      .toBe $scope.name + $scope.ctrl.name
