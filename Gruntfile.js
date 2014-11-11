module.exports = function(grunt) {
    grunt.initConfig({
        
        // Test
        jshint: {
            
            files: [
                'gruntfile.js', 
                'warna.js',
            ],
            
            options: {
                globals: {
                    console: true
                }
            }
        },

        // Node.js test
		mochaTest: {
			test: {
				options: {
					reporter: 'dot'
				},
				src: ['test/*.js']
			}
		},

        // Build all test file for browser test
        browserify: {
            test: {
                files: {
                    'test/build/main.js': ['test/*.js'],
                }
            }
        },

        // Browser test
        karma: {
            unit: {
                configFile: 'karma.conf.js',
            }
        },

        clean: ['test/build'],

        // Build
        uglify: {
            options: {
                mangle: true,
                sourceMap: true,
                sourceMapName: 'warna.min.js.map',
                preserveComments: 'some'
            },
            js: {
                files: {
                    'warna.min.js': ['warna.js']
                }
            }
        },
        
        watch: {
            script: {
               options: {
                    spawn: false,
                    event: ['added', 'deleted', 'changed']
                },
                files: ['**/*.js'],
                tasks: ['jshint', 'mochaTest', 'uglify']
            },
            grunt: {
                files: ['Gruntfile.js']
            }
        }
    });
    
    // Load module
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    // Create grunt task
    grunt.registerTask('test', ['jshint', 'mochaTest']);
    grunt.registerTask('browser-test', ['jshint', 'mochaTest', 'browserify', 'karma', 'clean']);
    grunt.registerTask('build', ['jshint', 'mochaTest', 'browserify', 'karma', 'clean', 'uglify']);
};