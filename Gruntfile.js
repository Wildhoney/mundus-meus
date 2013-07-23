module.exports = function(grunt) {

    grunt.initConfig({

        package: grunt.file.readJSON('package.json'),

        jshint: {
            all: ['packages/mundus-meus/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        less: {
            development: {
                options: {
                    paths: ['dist'],
                    yuicompress: true
                },
                files: {
                    'dist/<%= package.buildName %>.css': 'example/less/mundus-meus.less'
                }
            }
        },

        concat: {
            scripts: {
                src: 'packages/mundus-meus/*.js',
                dest: 'dist/<%= package.buildName %>.js'
            }
        },

        uglify: {
            options: {
                mangle: false,
                banner: '/*! <%= package.name %> by <%= package.author %> created on <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'dist/<%= package.buildName %>.js',
                dest: 'dist/<%= package.buildName %>.min.js'
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('default', ['jshint', 'concat', 'less', 'uglify']);

};