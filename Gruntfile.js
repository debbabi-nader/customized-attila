module.exports = function (grunt) {

    'use strict';
    
    require('load-grunt-tasks')(grunt, {
        pattern: ['grunt-*']
    });

    grunt.initConfig({
    
        pkg: grunt.file.readJSON('package.json'),
    
        config: {
            'cssSrcDir': 'src/sass',
            'cssTargetDir': 'assets/css',
            'jsSrcDir': 'src/js',
            'jsTargetDir': 'assets/js',
            'fontSrcDir': 'src/font',
            'fontTargetDir': 'assets/font',
            'distDir': `dist/${require('./package.json').name}`,
            'zipDir': 'dist'
        },
        copy: {
            dist: {
                files: [
                    {
                        dest: '<%=  config.distDir %>/<%=  config.fontTargetDir %>/',
                        src: '*',
                        cwd: '<%=  config.fontSrcDir %>',
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
        clean: {
            dist: ['dist']
        },
        sass: {
            dist: {
                options: {
                    outputStyle: 'compressed'
                },
                files: {
                    '<%=  config.distDir %>/<%=  config.cssTargetDir %>/style.css': '<%=  config.cssSrcDir %>/style.scss'
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
                src: '<%=  config.distDir %>/<%=  config.cssTargetDir %>/*.css'
            }
        },
        uglify: {
            js: {
                files: {
                    '<%=  config.distDir %>/<%=  config.jsTargetDir %>/script.js': ['<%=  config.jsSrcDir %>/libs/jquery-*.js', '<%=  config.jsSrcDir %>/**/*.js']
                }
            }
        },
        watch: {
            all: {
                files: ['package.json', 'LICENSE', '*.hbs', 'locales/**', 'partials/**', '<%=  config.fontSrcDir %>/**', '<%=  config.cssSrcDir %>/**/*.scss', '<%=  config.jsSrcDir %>/**/*.js'],
                tasks: ['sass', 'postcss', 'uglify', 'copy']
            }
        },
        zip: {
            dist: {
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
