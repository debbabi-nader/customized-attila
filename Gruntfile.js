module.exports = function (grunt) {

    'use strict';
    
    require('load-grunt-tasks')(grunt, {
        pattern: ['grunt-*']
    });

    grunt.initConfig({
    
        pkg: grunt.file.readJSON('package.json'),
    
        config: {
            'stylesDir': 'assets/styles',
            'scriptsDir': 'assets/scripts',
            'fontsDir': 'assets/fonts',
            'distDir': `dist/${require('./package.json').name}`,
            'zipDir': 'dist'
        },
        clean: {
            dist: ['dist']
        },
        sass: {
            dist: {
                options: {
                    outputStyle: 'compressed'
                },
                files: {
                    '<%=  config.distDir %>/<%=  config.stylesDir %>/main.css': '<%=  config.stylesDir %>/main.scss'
                }
            }
        },
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')({
                        browsers: ['last 2 versions']
                    })
                ]
            },
            dist: {
                src: '<%=  config.distDir %>/<%=  config.stylesDir %>/*.css'
            }
        },
        uglify: {
            js: {
                files: {
                    '<%=  config.distDir %>/<%=  config.scriptsDir %>/main.js': ['<%=  config.scriptsDir %>/vendors/jquery-*.js', '<%=  config.scriptsDir %>/**/*.js']
                }
            }
        },
        copy: {
            dist: {
                files: [
                    {
                        dest: '<%=  config.distDir %>/<%=  config.fontsDir %>/',
                        src: '*',
                        cwd: '<%=  config.fontsDir %>',
                        expand: true
                    },
                    {
                        dest: '<%=  config.distDir %>/',
                        src: ['package.json', 'LICENSE', '*.hbs', 'locales/**', 'partials/**'],
                        expand: true
                    }
                ]
            }
        },
        watch: {
            all: {
                files: ['package.json', 'LICENSE', '*.hbs', 'locales/**', 'partials/**', '<%=  config.fontsDir %>/**', '<%=  config.stylesDir %>/**/*.scss', '<%=  config.scriptsDir %>/**/*.js'],
                tasks: ['sass', 'postcss', 'uglify', 'copy']
            }
        },
        zip: {
            dist: {
                cwd: '<%=  config.distDir %>',
                src: '<%=  config.distDir %>/**',
                dest: `<%=  config.zipDir %>/${require('./package.json').name}.zip`
            }
        }

    });

    grunt.registerTask('build', [
    
        'clean',
        'sass',
        'postcss',
        'uglify',
        'copy'
    
    ]);

    grunt.registerTask('default', [
    
        'clean',
        'sass',
        'postcss',
        'uglify',
        'copy',
        'watch'
    
    ]);

};
