// Karma configuration
// Generated on Wed Oct 08 2014 14:39:55 GMT+0300 (EEST)

module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],

        reporters: ['progress', 'coverage'],

        coverageReporter: {
            dir: 'coverage',
            subdir: '.'
        },

        ngHtml2JsPreprocessor: {
            moduleName: "number-spinner-template"
        },

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        browsers: ['PhantomJS'],

        singleRun: true
    });
};