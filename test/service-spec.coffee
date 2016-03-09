'use strict';

describe 'annotations:', ->

  beforeEach module 'test'

  describe '@service', ->
    deps = null
    testServiceTwo = null

    beforeEach inject (_$http_, _$parse_, _testServiceTwo_) ->
      deps =
        $http: _$http_
        $parse: _$parse_
      testServiceTwo = _testServiceTwo_

    it 'should be defined', ->

      expect at.service
      .toEqual jasmine.any Function

    it 'should instantiate decorated class as new service', ->

      expect testServiceTwo
      .toBeDefined()

      expect testServiceTwo
      .toEqual jasmine.any test.TestServiceTwo

    it 'should pass proper dependencies (based on static member "$inject") to service constructor', ->

      for dep in test.TestServiceTwo.$inject
        expect testServiceTwo["$$#{ dep.replace('$', '') }"]
        .toBe deps[dep]


  describe '@service without Service name', ->
    testServiceFour = null

    beforeEach inject (_TestServiceFour_) ->
      testServiceFour = _TestServiceFour_

    it 'should be defined', ->

      expect at.service
      .toEqual jasmine.any Function

    it 'should instantiate decorated class as new service', ->

      expect testServiceFour
      .toBeDefined()

      expect testServiceFour
      .toEqual jasmine.any test.TestServiceFour