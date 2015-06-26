'use strict';

describe 'annotations:', ->

  it 'should be defined', ->

    expect app.attachInjects
    .toEqual jasmine.any Function

    expect app.inject
    .toEqual jasmine.any Function

    expect app.service
    .toEqual jasmine.any Function

    expect app.controller
    .toEqual jasmine.any Function

    expect app.classFactory
    .toEqual jasmine.any Function


  describe 'attachInjects', ->
    target1 = null
    target2 = null
    target3 = null

    beforeEach ->
      target1 = ( -> )
      target2 = ( -> )
      target3 = ( -> )
      target1.$inject = ['dep1', 'dep2']
      target2.$inject = ['dep3']
      target3.$inject = null
      app.attachInjects target1, 'dep1', 'dep2'
      app.attachInjects target2, 'dep3'
      app.attachInjects target3, 'dep1', 'dep2', 'dep3'

    it 'should assign proper $inject array to target.prototype', ->

      expect target1.prototype.$_dep1
      .toBe 'dep1'

      expect target1.prototype.$_dep2
      .toBe 'dep2'

      expect target2.prototype.$_dep3
      .toBe 'dep3'

      expect Object.keys(target3.prototype).filter((key) -> ['$_dep1', '$_dep2', '$_dep3'].indexOf(key) > -1).length
      .toBe 0


  describe '@inject', ->
    target1 = null
    target2 = null

    beforeEach ->
      target1 = {}
      target2 = ( -> )
      app.inject('dep1', 'dep2') target1
      app.inject('dep2', 'dep3', 'dep4', 'dep5') target2

    it 'should assign proper $inject array to target', ->

      expect target1.$inject
      .toEqual ['dep1', 'dep2']

      expect target2.$inject
      .toEqual ['dep2', 'dep3', 'dep4', 'dep5']


  describe '@service', ->
    ngModule = null

    beforeEach ->
      ngModule = service: jasmine.createSpy 'service'
      spyOn angular, 'module'
      .and.returnValue ngModule
      app.service('MOD', 'SERV') 'Constr'

    it 'should assign service to proper module under proper key', ->

      expect angular.module
      .toHaveBeenCalledWith 'MOD'

      expect ngModule.service
      .toHaveBeenCalledWith 'SERV', 'Constr'


  describe '@controller', ->
    ngModule = null

    beforeEach ->
      ngModule = controller: jasmine.createSpy 'controller'
      spyOn angular, 'module'
      .and.returnValue ngModule
      app.controller('MOD', 'CTRL') 'Constr'

    it 'should assign controller to proper module under proper key', ->

      expect angular.module
      .toHaveBeenCalledWith 'MOD'

      expect ngModule.controller
      .toHaveBeenCalledWith 'CTRL', 'Constr'


  describe '@directive', ->
    ngModule = null

    beforeEach ->
      ngModule = directive: jasmine.createSpy 'directive'
      spyOn angular, 'module'
      .and.returnValue ngModule
      app.directive('MOD', 'CTRL') 'Constr'

    it 'should assign controller to proper module under proper key', ->

      expect angular.module
      .toHaveBeenCalledWith 'MOD'

      expect ngModule.directive
      .toHaveBeenCalledWith 'CTRL', jasmine.any(Function)


  describe '@classFactory', ->
    ngModule = null

    beforeEach ->
      ngModule = factory: jasmine.createSpy 'controller'
      spyOn angular, 'module'
      .and.returnValue ngModule
      app.classFactory('MOD', 'FACT') 'Constr'

    it 'should assign service to proper module under proper key', ->

      expect angular.module
      .toHaveBeenCalledWith 'MOD'

      expect ngModule.factory
      .toHaveBeenCalledWith 'FACT', (jasmine.any Function)


