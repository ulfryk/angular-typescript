'use strict';

describe 'annotations:', ->

  beforeEach module 'test'

  describe '@classFactory (with @inject)', ->
    $http = null
    $parse = null
    TestClassOne = null

    beforeEach inject (_$http_, _$parse_, _TestClassOne_) ->
      $http = _$http_
      $parse = _$parse_
      TestClassOne = _TestClassOne_

    it 'should create class as a service', ->

      expect TestClassOne
      .toBeDefined()

      expect TestClassOne
      .toBe test.TestClassOne

    it 'should assign proper $inject array to service constructor', ->

      expect test.TestClassOne.$inject
      .toEqual ['$http', '$parse']


    it 'should add proper dependencies to constructor prototype', ->

      expect TestClassOne.prototype.$$http
      .toBe $http

      expect TestClassOne.prototype.$$parse
      .toBe $parse

    it 'should provide proper dependencies for instance', ->

      testInstanceOne = new TestClassOne()

      expect testInstanceOne.$$http
      .toBe $http

      expect testInstanceOne.$$parse
      .toBe $parse

      expect testInstanceOne.accept
      .toBe 'application/json, text/plain, */*'


