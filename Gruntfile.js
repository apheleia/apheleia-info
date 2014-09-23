module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            options: {
                loadPath: ['bower_components/foundation/scss']
            },
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'build/app.css': 'src/scss/app.scss',
                    'build/apheleia.css': 'src/scss/apheleia.scss',
                    'build/font-awesome.css': 'bower_components/components-font-awesome/scss/font-awesome.scss'
                }
            }
        },

        concat: {
            options: {},

            dist: {
                src: ['build/app.css', 'build/font-awesome.css', 'build/apheleia.css'],
                dest: 'target/css/apheleia.css'
            }
        },

        uglify: {
            options: {
                mangle: false
            },

            apheleia: {
                files: {
                    'target/js/apheleia.js': ['bower_components/angular/angular.js', 'src/js/apheleia.js']
                }
            },

            modernizr: {
                files: {
                    'target/js/modernizr.js': ['bower_components/modernizr/modernizr.js']
                }
            }
        },

        copy: {
            main: {
                files: [
                    {src: 'src/index.html', dest: 'target/index.html'},
                    {src: 'src/img/profile.png', dest: 'target/img/profile.png'},
                    {expand: true, flatten: true, filter: 'isFile', src: ['bower_components/components-font-awesome/fonts/*'], dest: 'target/fonts/'}
                ]
            }
        },

        watch: {
            grunt: { files: ['Gruntfile.js'] },

            sass: {
                files: 'src/scss/**/*.scss',
                tasks: ['sass']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('build', ['sass', 'concat', 'uglify', 'copy']);
    grunt.registerTask('js', ['uglify']);
    grunt.registerTask('html', ['copy']);
    grunt.registerTask('css', ['sass', 'concat']);
    grunt.registerTask('default', ['build']);
};
