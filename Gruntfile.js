/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/widget.js']
      }
    },
    lightweight_template_precompiler: {
      compile: {
        files: {
          'dist/template.js': 'lib/so-card-template.html'
        }
      }
    },
    concat: {
      dist: {
        src: ['dist/template.js', 'lib/widget.js'],
        dest: 'dist/so-card-widget.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: 'dist/so-card-widget.js',
        dest: 'dist/so-card-widget.min.js'
      }
    },
    less: {
      compile: {
        src: 'lib/widget.less',
        dest: 'dist/so-card-widget.css'
      }
    },
    cssmin: {
      dist: {
        src: 'dist/so-card-widget.css',
        dest: 'dist/so-card-widget.min.css'
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: ['lib/widget.js', 'lib/widget.less',
                'lib/so-card-template.html', 'dist/template.js'],
        tasks: ['default']
      }
    },
    qunit: {
      files: ['test/**/*.html']
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-lightweight-template-precompiler');

  // Default task.
  grunt.registerTask('default', ['jshint', 'lightweight_template_precompiler',
                                 'concat', 'uglify', 'less', 'cssmin']);
  grunt.registerTask('init', ['default', 'watch']);

};
