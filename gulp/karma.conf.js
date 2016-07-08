module.exports = function (config) {
    config.set({
        basePath: '',
        files: [
            '../node_modules/angular/angular.js',
            '../dist/at-angular.js',
            '../node_modules/angular-resource/angular-resource.js',
            '../dist/at-angular-resource.js',
            '../node_modules/angular-mocks/angular-mocks.js',
            '../dist/test/module.js',
            '../dist/test/*.js',
            '../dist/*.js',
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

