var gulp = require("gulp"),
  sass = require("gulp-sass"),
  autoprefixer = require("gulp-autoprefixer"),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify"),
  watch = require("gulp-watch"),
  sourcemaps = require("gulp-sourcemaps"),
  connect = require("gulp-connect");

var jsInput = {
  js: "assets/js/dev/**/*.js"
};
var jsOutput = "assets/js/dist/";

gulp.task("server", function() {
  connect.server({
    livereload: true
  });
});

gulp.task("sass", function() {
  return gulp
    .src("assets/sass/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(
      autoprefixer({
        browsers: ["last 5 versions"],
        cascade: false
      })
    )
    .pipe(
      sass({
        outputStyle: "compressed"
      }).on("error", sass.logError)
    )
    .pipe(sourcemaps.write("./maps"))
    .pipe(gulp.dest("./css"))
    .pipe(connect.reload());
});

gulp.task("html", function() {
  gulp.src("./html").pipe(connect.reload());
});

gulp.task("livereload", function() {
  gulp.src(["./css/style.css", "assets/js/dist/*.js"]).pipe(connect.reload());
});

gulp.task("js", function() {
  return gulp
    .src(jsInput.js)
    .pipe(concat("app.mins.js"))
    .pipe(uglify())
    .pipe(gulp.dest("assets/js/dist"))
    .pipe(connect.reload());
});

gulp.task("watch", function() {
  gulp.watch("assets/sass/**/*.scss", ["sass"]);
  gulp.watch("assets/js/**/*.js", ["js"]);
  gulp.watch("./*.html", ["html"]);
});

gulp.task("default", ["sass", "server", "watch", "livereload", "js"]);
