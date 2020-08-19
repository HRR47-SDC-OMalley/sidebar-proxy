const grunt = require('grunt');

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    aws: grunt.file.readJSON(process.env.HOME + '/.aws/grunt-aws.json'),
    s3: {
      options: {
        accessKeyId: '<%= aws.accessKeyId %>',
        secretAccessKey: '<%= aws.secretAccessKey %>',
        bucket: '<%= aws.bucket %>'
      },
      styles: {
        src: 'public/styles.css',
        dest: '<%= aws.path %>assets/styles.css'
      }
    }
  });

  grunt.loadNpmTasks('grunt-aws');

  grunt.registerTask('default', ['s3']);
};
