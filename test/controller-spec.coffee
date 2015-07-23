'use strict';

describe 'annotations:', ->

  beforeEach module 'test'

  describe '@controller (with @inject)', ->
    $scope = null
    $parse = null
    firstTestCtrl = null

    beforeEach inject ($controller, $rootScope, _$parse_) ->
      $scope = $rootScope.$new()
      $parse = _$parse_
      firstTestCtrl = $controller 'FirstTestCtrl', $scope: $scope

    it 'should be defined', ->

      expect at.controller
      .toEqual jasmine.any Function

    it 'should instantiate decorated class as new service', ->

      expect firstTestCtrl
      .toBeDefined()

      expect firstTestCtrl
      .toEqual jasmine.any test.FirstTestCtrl

    it 'should assign proper $inject array to service constructor', ->

      expect test.FirstTestCtrl.$inject
      .toEqual ['$scope', '$parse']

    it 'should make proper dependencies are passed to service constructor on instantiation', ->

      expect firstTestCtrl.$$parse
      .toBe $parse

      expect $scope.name
      .toBe 'FirstTestCtrl'


