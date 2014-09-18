module.exports = function(grunt) {
    grunt.initConfig({

        jshint: {
            
            files: ['Gruntfile.js', 'foto.js'],
            
            options: {
                globals: {
                    console: true
                }
            }
        },
   
        uglify: {
            options: {
                mangle: true,
                sourceMap: true,
                sourceMapName: 'foto.min.js.map',
                preserveComments: 'some'
            },
            my_target: {
                files: {
                    'foto.min.js': ['foto.js']
                }
            }
        },
        
        watch: {
            script: {
               options: {
                    spawn: false,
                    event: ['added', 'deleted', 'changed']
                },
                files: ['*.js'],
                tasks: ['jshint', 'uglify']
            },
            grunt: {
                files: ['Gruntfile.js']
            }
        }
    });
    
    // Load module
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    // Create grunt task
    grunt.registerTask('build', ['jshint', 'uglify']);
};