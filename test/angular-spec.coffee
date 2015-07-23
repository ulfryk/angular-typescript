'use strict';

describe 'annotations:', ->

  it 'should be defined', ->

    expect at.attachInjects
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
      at.attachInjects target1, 'dep1', 'dep2'
      at.attachInjects target2, 'dep3'
      at.attachInjects target3, 'dep1', 'dep2', 'dep3'

    it 'should assign proper $inject array to target.prototype', ->

      expect target1.prototype.$$dep1
      .toBe 'dep1'

      expect target1.prototype.$$dep2
      .toBe 'dep2'

      expect target2.prototype.$$dep3
      .toBe 'dep3'

      expect Object.keys(target3.prototype).filter((key) -> ['$$dep1', '$$dep2', '$$dep3'].indexOf(key) > -1).length
      .toBe 0


