import gulp from 'gulp';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import { deleteAsync } from 'del';
import gulpTypescript from 'gulp-typescript';

const { createProject } = gulpTypescript;

const tsProject = createProject('tsconfig.json');

const { task, src, dest } = gulp;

export function clean() {
  return deleteAsync('dist');
}

export default () => {
  return tsProject
    .src()
    .pipe(tsProject())
    .js.pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(dest('minify'));
};
