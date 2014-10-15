'use strict';

module.exports = function (grunt) {

    var dependencies = [
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js'
        ],

        projectFiles = [
            'src/js/number-spinner.directive.js'
        ],

        testFiles = [
            'test/*.js'
        ],

        templates = [
            'src/template/*.html'
        ];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            files: projectFiles.concat(testFiles),
            options: grunt.file.readJSON('.jshintrc')
        },

        watch: {
            jsfiles: {
                files: projectFiles.concat(testFiles).concat(templates),
                tasks: ['jshint', 'karma']
            },

            changables: {
                files: ['src/**', 'test/**'],
                options: {
                    livereload: true
                }
            }
        },

        connect: {
            server: {
                options: {
                    port: 3000,
                    base: ['src', 'test', 'bower_components']
                }
            }
        },

        karma: {
            unit: {
                options: {
                    configFile: 'karma.conf.js',
                    files: dependencies.concat(templates).concat(projectFiles).concat(testFiles),
                    preprocessors: {
                        'src/js/*.js': ['coverage'],
                        "src/template/*.html": ["ng-html2js"]
                    }
                }
            }
        },

        uglify: {
            dist: {
                files: {
                    'dist/ui-number-spinner.min.js': projectFiles
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('test', ['jshint', 'karma']);

    grunt.registerTask('build', ['uglify']);

    grunt.registerTask('default', ['connect', 'watch']);
};