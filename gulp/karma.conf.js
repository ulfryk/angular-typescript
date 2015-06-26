module.exports = function (config) {
    config.set({
        basePath: '',
        files: [
            '../.tmp/js/vendor/moment/moment.js',
            '../.tmp/js/vendor/moment-timezone/builds/moment-timezone-with-data-2010-2020.js',
            '../.tmp/js/vendor/angular/angular.js',
            '../.tmp/js/vendor/angular-animate/angular-animate.js',
            '../.tmp/js/vendor/angular-cookies/angular-cookies.js',
            '../.tmp/js/vendor/angular-resource/angular-resource.js',
            '../.tmp/js/vendor/angular-translate/angular-translate.js',
            '../.tmp/js/vendor/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
            '../.tmp/js/vendor/angular-ui-r*/**/*.js',
            '../.tmp/js/vendor/tri-angular-*/**/*.js',
            '../.tmp/js/vendor/**/*.js',

            '../.tmp/js/modules/**/*-module.js',
            '../.tmp/js/modules/**/*.js',

            '../src/**/*spec.coffee'
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
            '../.tmp/js/modules/annotations/**/*.js': ['coverage'],
            '../.tmp/js/modules/**/services/*.js': ['coverage'],
            '../.tmp/js/modules/**/filters/*.js': ['coverage'],
            '../.tmp/js/modules/**/directives/*.js': ['coverage'],
            '../.tmp/js/modules/**/components/**/*.js': ['coverage'],
            '../.tmp/js/modules/app/routes/**/*.js': ['coverage'],
            '../.tmp/js/modules/**/controllers/*.js': ['coverage'],
            '../src/**/*spec.coffee': ['coffee']
        },
        captureTimeout: 60000,
        singleRun: false,
        frameworks: ['jasmine']
    });
};

