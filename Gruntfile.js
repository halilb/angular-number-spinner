'use strict';

module.exports = function (grunt) {

    var dependencies = [
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js'
        ],

        projectFiles = [
            'src/js/number-spinner.directive.js'
        ],

        testDependencies = [
            'bower_components/jquery/dist/jquery.js'
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
                files: ['src/**', 'test/**', 'demo/**/**'],
                options: {
                    livereload: true
                }
            }
        },

        connect: {
            server: {
                options: {
                    port: 3000,
                    base: ['.', 'demo', 'template', 'bower_components', 'src']
                }
            }
        },

        karma: {
            unit: {
                options: {
                    configFile: 'karma.conf.js',
                    files: testDependencies.concat(dependencies).concat(templates)
                        .concat(projectFiles).concat(testFiles),
                    preprocessors: {
                        'src/js/*.js': ['coverage'],
                        'src/template/*.html': ['ng-html2js']
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
        },

        concat: {
            options: {
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */ \n',
            },
            dist: {
                src: ['src/js/*.js'],
                dest: 'dist/angular-number-directive.js',
            }
        },

        html2js: {
            dist: {
                src: ['src/template/*.html'],
                dest: 'src/js/templates.js'
            }
        },

        clean: {
            dist: {
                src: ['src/js/templates.js']
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('test', ['jshint', 'karma']);

    grunt.registerTask('build', ['uglify']);
    grunt.registerTask('dist', ['html2js:dist', 'concat:dist', 'clean:dist']);

    grunt.registerTask('default', ['connect', 'watch']);
};