module.exports = function (config) {
    config.set({
        basePath: '',
        files: [
            '../node_modules/angular/angular.js',
            '../node_modules/angular-resource/angular-resource.js',
            '../node_modules/angular-mocks/angular-mocks.js',
            '../node_modules/ts-helpers/index.js',
            '../at-angular.js',
            '../at-angular-resource.js',
            '../test/module.js',
            '../test/*.js',
            {pattern: '../test/*.ts', included: false},
            '../test/*.coffee'
        ],
        exclude: [],
        reporters: ['mocha', 'coverage'],
        port: 9876,
        runnerPort: 9100,
        colors: true,
        logLevel: config.LOG_WARN,
        autoWatch: true,
        browsers: ['PhantomJS2'],
        plugins: [
            'karma-jasmine',
            'karma-coffee-preprocessor',
            'karma-coverage',
            'karma-chrome-launcher',
            'karma-mocha-reporter',
            'karma-phantomjs2-launcher'
        ],
        preprocessors: {
            '../dist/at-*.js': ['coverage'],
            '../test/*.coffee': ['coffee']
        },
        captureTimeout: 60000,
        singleRun: false,
        frameworks: ['jasmine']
    });
};

