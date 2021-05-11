"use strict";
var path = "Bibino";

const { src, dest, watch } = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const cleanCSS = require("gulp-clean-css");

// Compile SCSS(SASS) files, autoprefix and minify
function compileSass(done) {
  src(path + "/resources/sass/main.scss")
    .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest(path + "/resources/css"));
    src("Barkio" + "/resources/sass/main.scss")
    .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest("Barkio" + "/resources/css"));
  done();
}

// Watch all scss files for change
function watchScss() {
  watch("./**/*.scss", compileSass);
}

exports.watchScss = watchScss;
