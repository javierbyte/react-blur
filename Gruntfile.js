module.exports = function(grunt) {
    require('jit-grunt')(grunt);

    grunt.initConfig({
        shell: {
            options: {
                stderr: false
            },
            clear: {
                command: 'clear && mkdir -p dist'
            },
            reactify: {
                command: 'browserify -t [reactify --harmony] src/js/app.jsx -o dist/app.js'
            },
            less: {
                command: 'lessc src/css/main.less --autoprefix > dist/style.css'
            }
        },
        watch: {
            styles: {
                options: {
                    livereload: true
                },
                files: ['src/**/*.less'],
                tasks: ['shell:less'],
            },
            html: {
                options: {
                    livereload: true
                },
                files: ['index.html'],
            },
            scripts: {
                options: {
                    livereload: true
                },
                files: ['src/**/*.jsx', 'src/**/*.js'],
                tasks: ['shell:reactify'],
            }
        }
    });

    grunt.registerTask('build', ['shell:clear', 'shell:reactify', 'shell:less']);
    grunt.registerTask('default', ['build', 'watch']);
}
