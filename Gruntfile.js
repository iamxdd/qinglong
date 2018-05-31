module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		skinPath: {
			css: "build/css",
			scss: "src/scss"
		},
		//uglify压缩插件
		uglify: {
			options: {
				stripBanners: false,
				banner: '/*!<%-pkg.name%>-<%-pkg.version%> <%-grunt.template.today("yyyy-mm-dd")%>*/\n'
			},
			build: { //任务1：压缩src/js目录下所有js文件并输出到build/js目录下
				files: [{
						expand: true,
						cwd: 'app/controller', //js目录下
						src: '*.js', //所有js文件
						dest: 'app/controller/js' //输出到此目录下
					}
					/*,{
										expand: true,
										cwd: 'app/js', //js目录下
										src: '*.js', //所有js文件
										dest: 'app/js/js' //输出到此目录下
									}*/
				]
			}
		},
		//jshint插件配置信息
		jshint: {
			bulid: ['Gruntfile.js', 'app/controller/*.js'],
			options: {
				jshintrc: '.jshintrc'
			}
		},
		cssmin: {
			css: {
				src: 'app/css/custom/customcss.css',
				dest: 'app/css/custom/customcss.min.css'
			}
		},
		//csshint插件配置信息
		csslint: {
			build: ['app/css/custom/customcss.css'],
			options: {
				csslintrc: '.csslintrc'
			}
		},
		watch: {
			bulid: {
				files: ['*.js', '*.html', 'app/js/*js', 'app/controller/*js', 'server/*.json', 'app/js/*.js', 'app/css/*.css', 'app/css/custom/*.css', 'app/views/*.html'],
				tasks: ['cssmin' /*,'jshint', 'uglify',   'csslint'*/ ],
				options: {
					spawn: false
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.registerTask('default', ['jshint', 'uglify', 'cssmin', /*'csslint',*/ 'watch']);
};