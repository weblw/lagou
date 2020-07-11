// grunt的入口文件
// 用于定义一些 grunt 自动执行的任务
// 需要导出一个函数
// 次函数接收一个 grunt 的形参，内部提供一些创建任务时需要用到的 API
const sass = require('sass')
const loadGruntTasks = require('load-grunt-tasks')

module.exports = grunt => {
  grunt.registerTask('foo', () => {
    console.log('grunt')
  })
  grunt.registerTask('bar', () => {
    console.log('grunt bar')
  })
  grunt.registerTask('bad', () => {
    console.log('bad')
    return false
  })
  grunt.registerTask('default', ['foo', 'bad', 'bar', 'async-task'])
  grunt.registerTask('async-task', function () {
    const done = this.async()
    setTimeout(() => {
      console.log(1)
      done(false)
    }, 500)
  })
  grunt.initConfig({
    build: {
      options: {
        foo: 'bar'
      },
      css: '1',
      js: '2'
    },
    clean: {
      temp: 'temp/app.js'
    },
    sass: {
      options: {
        sourceMap: true,
        implementation: sass
      },
      main: {
        files: {
          'dist/css/main.css': 'src/scss/main.scss'
        }
      }
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ['@babel/preset-env']
      },
      main: {
        files: {
          'dist/js/app.js': 'src/js/app.js'
        }
      }
    },
    watch: {
      js: {
        files: ['src/js/*.js'],
        tasks: ['babel']
      },
      css: {
        files: ['src/scss/*.scss'],
        tasks: ['sass']
      }
    }
  })
  grunt.registerTask('foo2', () => {
    console.log(grunt.config('foo.bar'))
  })
  grunt.registerMultiTask('build', function () {
    console.log(this.options())
    console.log(`target:${this.target},data:${this.data}`)
  })
  // grunt.loadNpmTasks('grunt-sass')
  // 自动加载npm tasks
  loadGruntTasks(grunt)

  grunt.registerTask('default', ['sass', 'babel', 'watch'])
}