let tests = [];
for (let file in (window as any).__karma__.files) {
  if ((window as any).__karma__.files.hasOwnProperty(file)) {
    if (/spec\.js$/.test(file)) {
      file = file.replace(/\/base\/|.js/g, '');
      tests.push(file);
    }
  }
}

declare var require: any;
require.config({
  // Karma serves files from '/base'
  baseUrl: '/base',

  paths: {
    'angular': 'node_modules/angular/angular',
    'angular-mocks': 'node_modules/angular-mocks/angular-mocks',
    'angular-resource': 'node_modules/angular-resource/angular-resource',
    'ts-helpers': 'node_modules/ts-helpers/index'
  },

  shim: {
    // 'angular': {exports: 'angular'},
    'angular-mocks': {deps: ['angular']},
    'angular-resource': {deps: ['angular']}
  },

  // ask Require.js to load these files (all our tests)
  deps: tests,

  // start test run, once Require.js is done
  callback: (window as any).__karma__.start
});
