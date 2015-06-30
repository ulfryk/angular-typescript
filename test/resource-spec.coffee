'use strict';

describe 'annotations:', ->

  beforeEach module 'test'

  describe '@resource (with @inject)', ->
    $http = null
    $parse = null
    $resource = null
    TestResourceOne = null

    beforeEach inject (_$http_, _$parse_, _$resource_, _TestResourceOne_) ->
      $http = _$http_
      $parse = _$parse_
      $resource = _$resource_
      TestResourceOne = _TestResourceOne_

    it 'should prepare decorated resource class as new service', ->

      expect TestResourceOne
      .toBeDefined()

    it 'should copy all class features to provided resource class', ->

      Object.keys(angular.extend({}, test.TestResourceOne)).forEach (key) ->
        expect TestResourceOne[key]
        .toEqual test.TestResourceOne[key]

      Object.keys(angular.extend({}, test.TestResourceOne.prototype)).forEach (key) ->
        expect TestResourceOne.prototype[key]
        .toEqual test.TestResourceOne.prototype[key]

    it 'should assign proper $inject array to service constructor', ->

      expect test.TestResourceOne.$inject
      .toEqual ['$http', '$parse']

      expect TestResourceOne.$inject
      .toEqual ['$http', '$parse']

    it 'should make mix of class instance and resource instance (on new)', ->
      instance = new TestResourceOne name: 'Grants', age: 15
      Resource = $resource test.TestResourceOne.url
      resource = new Resource name: 'Grants', age: 15

      for key, value of resource
        expect resource[key]?.toString()
        .toEqual instance[key]?.toString()

    it 'should make proper class instance (on new)', ->
      model = name: ' :: THE NAME :: ', age: 1001.1
      instance = new TestResourceOne model
      fakeInstance = new test.TestResourceOne model

      expect instance.name
      .toBe model.name

      expect instance.age
      .toBe model.age

      expect fakeInstance.name
      .toBe model.name

      expect fakeInstance.age
      .toBe model.age

      expect instance.getLabel()
      .toBe 'application/json, text/plain, */* :: THE NAME :: 1001.1'


