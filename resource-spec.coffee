'use strict';

describe 'annotations:', ->
  $resource = null

  beforeEach module 'ngResource'
  beforeEach inject (_$resource_) ->
    $resource = _$resource_

  it 'should be defined', ->

    expect app.resource
    .toEqual jasmine.any Function


  describe '@resource', ->
    xResource = null
    class Target

    beforeEach ->
      app.resource('/url') Target
      xResource = $resource '/url'

    it "should add Resource proper fields to Target and Target's proto", ->

      Object.keys(angular.extend({}, xResource)).forEach (key) ->
        expect Target[key].toString()
        .toBe xResource[key].toString()

      Object.keys(angular.extend({}, xResource.prototype)).forEach (key) ->
        expect Target.prototype[key].toString()
        .toBe xResource.prototype[key].toString()

