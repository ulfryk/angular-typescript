import {attachInjects} from '../src/at-angular';

describe('angular-spec:', () => {

  let target1 = null;
  let target2 = null;
  let target3 = null;

  beforeEach(() => {
    target1 = () => {
    };
    target2 = () => {
    };
    target3 = () => {
    };
    //noinspection TypeScriptUnresolvedVariable
    target1.$inject = ['dep1', 'dep2'];
    //noinspection TypeScriptUnresolvedVariable
    target2.$inject = ['dep3'];
    //noinspection TypeScriptUnresolvedVariable
    target3.$inject = null;
    attachInjects(target1, 'dep1', 'dep2');
    attachInjects(target2, 'dep3');
    attachInjects(target3, 'dep1', 'dep2', 'dep3');
  });

  it('should assign proper $inject array to target.prototype', () => {
    expect(target1.prototype.dep1).toBe('dep1');
    expect(target1.prototype.dep2).toBe('dep2');
    expect(target2.prototype.dep3).toBe('dep3');
    expect(Object.keys(target3.prototype)
      .filter((key) => ['$$dep1', '$$dep2', '$$dep3'].indexOf(key) > -1).length)
      .toBe(0);

  });
});
