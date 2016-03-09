'use strict';

describe 'annotations:', ->

  beforeEach module 'test'

  describe '@decorator', ->
    TestServiceFive = null

    beforeEach inject (_TestServiceFive_) ->
      TestServiceFive = _TestServiceFive_

    it 'should be defined', ->

      expect at.service
      .toEqual jasmine.any Function

    it 'should instantiate decorated class as new service', ->

      expect TestServiceFive
      .toBeDefined()

      expect TestServiceFive
      .toEqual jasmine.any test.TestServiceFive

    it 'should have a name', ->

      expect TestServiceFive.name
      .toEqual 'TestServiceFive'

    it 'should have a method changeName() provided by the decorator', ->
      expect TestServiceFive.changeName
      .toBeDefined()

      TestServiceFive.changeName();
      expect TestServiceFive.name
      .toEqual 'TestServiceFiveDecorated'

    it 'should inject $delegate service', ->
      expect TestServiceFive.$delegate
      .toBeDefined()

      expect TestServiceFive.$delegate
      .toEqual jasmine.any test.TestServiceFive
