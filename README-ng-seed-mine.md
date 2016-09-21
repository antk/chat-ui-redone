A modified version of [angular-seed](https://github.com/angular/angular-seed)

##Differences between this and angular-seed
* Moved bower_components outside the app folder
* Now uses gulp as task runner to
  * start a server (gulp-connect), watch for changes, and reload the browser when changes occur
  * compile Sass to css
  * create a production ready (js/css minified and concatenated) dist
* Removed http-server as a dev dependency (see above)
* Updated karma.conf.js to reflect the new directory structure change (mainly bower_components)

##Development

####Clone this repo and install dependencies

```
$ git clone git@github.com:antk/ng-seed-mine.git
$ npm install
```

####Start the dev server
```$ npm run start-dev```

This will trigger `npm install` then `bower install` and finally run a gulp task to start a simple server and watch for file changes.

Navigate to [http://localhost:8000](http://localhost:8000)

At this point you can start hacking away at the code.  Any new changes saved will automatically reload the browser thanks to gulp-connect and livereload.  Neat!

##Production
####See the prod dist

```$ npm run start-prod```

This executes `npm install` which will in turn execute `bower install`.  Then it will run the gulp build task to copy necessary files to the `dist/` folder, compile scss, concat and minify js and css, and delete references that are no longer needed, resulting in a super sweet, easy to distribute, production-ready package.  It also starts a simple server that serves the assets out of the `dist/` folder.  Cool!

To test the dist, browse to [http://localhost:9000](http://localhost:9000)

For more details, refer to `gulpfile.js` and `package.json`

##Testing
####Unit tests

Kept the angular-seed stuff for testing.  To run unit tests:

```$ npm test```

####End-to-end tests

Same deal as above.  To run end-to-end tests:

```$ npm run protractor```
