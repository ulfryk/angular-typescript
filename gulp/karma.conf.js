module.exports = function (config) {
    config.set({
        basePath: '',
        files: [
            '../bower_components/angular/angular.js',
            '../bower_components/angular-mocks/angular-mocks.js',
            '../bower_components/angular-resource/angular-resource.js',
            '../.tmp/*.js',
            '../*spec.coffee'
        ],

        exclude: [
            '../.tmp/js/modules/**/*-run.js',
            '../.tmp/js/modules/app/configs/**/*.js'
        ],
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
            '../.tmp/*.js': ['coverage'],
            '../*spec.coffee': ['coffee']
        },
        captureTimeout: 60000,
        singleRun: false,
        frameworks: ['jasmine']
    });
};

