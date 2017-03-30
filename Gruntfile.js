module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
	    ignore_warning: {
	      options: {
	        '-W015': true,
	      },
	      src: ['src/**/*.js','app.js'],
	      filter: 'isFile'
	    },
	    options : {
	        jshintrc : './.jshintrc'
	     }
	},
    wiredep: {
	  task: {

	    // Point to the files that should be updated when
	    // you run `grunt wiredep`
	    src: [
	      'src/views/**/*.html',
			'src/views/**/*.ejs'
	    ],

	    options: {
	    	bowerJson: require('./bower.json'),
			directory: './public/lib',
			ignorePath: '../../public'
	      // See wiredep's configuration documentation for the options
	      // you may pass:
	    	//may have to override boostrap less for css
	    	//overrides:
	      // https://github.com/taptapship/wiredep#configuration
	    }
	  }
	},
	express: {
	    options: {
	      // Override defaults here
	    },
	    dev: {
	      options: {
	        script: 'app.js'
	      }
	    }
	},
	watch: {
		options: {
	      livereload: true,
	    },
		js: {
	    files: ['src/**/*.js', 'app.js'],
	    tasks: ['jshint', 'wiredep', 'express:dev'],
	    options: {
	        spawn: false,
	      }
	}
	
//		html: {
//			files: ['src/views/**/*.html'],
//			tasks: ['wiredep']
//		}
//		css: {
//		files: ['public/css/**/*.css'],
//		tasks: ['wiredep']
//		}
	}
   
  });

  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Task(s).
  grunt.registerTask('serve', [
	  'jshint',
	  'wiredep',
	  'express:dev',
	  'watch'
	  ]);

		grunt.registerTask('default', 'serve');
};