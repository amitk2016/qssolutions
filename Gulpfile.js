var gulp = require("gulp"),
  sass = require("gulp-sass"),
  gulpautoprefixer = require("gulp-autoprefixer"),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify"),
  watch = require("gulp-watch"),
  sourcemaps = require("gulp-sourcemaps"),
  connect = require("gulp-connect");
// var postcss = require("gulp-postcss");
// var autoprefixer = require("autoprefixer");

var jsInput = {
  js: "assets/js/dev/**/*.js"
};
var jsOutput = "assets/js/dist/";

var autoprefixBrowsers = [
  "> 1%",
  "last 2 versions",
  "firefox >= 4",
  "safari 7",
  "safari 8",
  "IE 8",
  "IE 9",
  "IE 10",
  "IE 11"
];

gulp.task("server", function() {
  connect.server({
    livereload: true
  });
});

gulp.task("sass", function() {
  return gulp
    .src("assets/sass/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(gulpautoprefixer("last 2 version"))
    .pipe(sass().on("error", sass.logError))
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
