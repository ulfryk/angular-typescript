'use strict';

describe 'annotations:', ->

  beforeEach module 'test'

  describe '@inject', ->
    $http = null
    $parse = null
    testServiceOne = null

    beforeEach inject (_$http_, _$parse_, _testServiceOne_) ->
      $http = _$http_
      $parse = _$parse_
      testServiceOne = _testServiceOne_

    it 'should be defined', ->

      expect at.inject
      .toEqual jasmine.any Function

    it 'should assign proper $inject array to service constructor', ->

      expect testServiceOne
      .toEqual jasmine.any test.TestServiceOne

      expect test.TestServiceOne.$inject
      .toEqual ['$http', '$parse']

    it 'should make proper dependencies are passed to service constructor on instantiation', ->

      expect testServiceOne.$$http
      .toBe $http

      expect testServiceOne.$$parse
      .toBe $parse


