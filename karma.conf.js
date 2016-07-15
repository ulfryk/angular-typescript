module.exports = function (config) {
  config.set({
    basePath: '',
    files: [
      {pattern: 'node_modules/angular/**/*.js', included: false},
      {pattern: 'node_modules/angular-mocks/**/*.js', included: false},
      {pattern: 'node_modules/angular-resource/**/*.js', included: false},
      {pattern: 'node_modules/ts-helpers/index.js', included: false},
      {pattern: 'src/**/*', included: false},
      {pattern: 'test/**/*', included: false},
      'test/test-main.js'
    ],
    // list of files to exclude
    exclude: [
      'node_modules/**/test/**/*.js',
      'node_modules/**/*.spec.js',
      'node_modules/**/*.test.js'
    ],
    reporters: ['mocha', 'coverage'],
    port: 9876,
    runnerPort: 9100,
    colors: true,
    logLevel: config.LOG_WARN,
    autoWatch: true,
    browsers: ['PhantomJS'],
    plugins: [
      'karma-jasmine',
      'karma-coverage',
      'karma-chrome-launcher',
      'karma-mocha-reporter',
      'karma-phantomjs-launcher',
      'karma-requirejs'
    ],
    // preprocessors: {
    //   '../src/at-*.js': ['coverage']
    // },
    captureTimeout: 60000,
    singleRun: true,
    frameworks: ['jasmine', 'requirejs']
  });
};

