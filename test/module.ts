import {autoDeclare} from '../src/at-angular';
import {TestServiceTwo} from './service';
import {TestServiceThree} from './inject-and-service';
import {FirstTestCtrl} from './controller';
import {TestComponent} from './component';
import {TestDirective} from './directive';
import {TestFactory} from './class-factory';
import {UserResource} from './resource';
import {TestServiceOne} from './inject';

export let testModule = autoDeclare('test',
  [
    'ngResource'
  ], [
    TestServiceOne,
    TestServiceTwo,
    TestServiceThree,
    FirstTestCtrl,
    TestComponent,
    TestDirective,
    TestFactory,
    UserResource
  ]);
