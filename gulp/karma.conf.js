module.exports = function (config) {
    config.set({
        basePath: '',
        files: [
            '../bower_components/angular/angular.js',
            '../.tmp/at-angular.js',
            '../bower_components/angular-resource/angular-resource.js',
            '../.tmp/at-angular-resource.js',
            '../bower_components/angular-mocks/angular-mocks.js',
            '../.tmp/module.js',
            '../.tmp/*.js',
            '../test/*.coffee'
        ],
        exclude: [],
        reporters: ['dots', 'coverage'],
        port: 9876,
        runnerPort: 9100,
        colors: true,
        logLevel: config.LOG_WARN,
        autoWatch: true,
        browsers: ['PhantomJS'],
        plugins: [
            'karma-jasmine',
            'karma-coffee-preprocessor',
            'karma-coverage',
            'karma-chrome-launcher',
            'karma-phantomjs-launcher'
        ],
        preprocessors: {
            '../.tmp/at-*.js': ['coverage'],
            '../test/*.coffee': ['coffee']
        },
        captureTimeout: 60000,
        singleRun: false,
        frameworks: ['jasmine']
    });
};

