## AngularJS | Browserify | Bootstrap | ExpressJS | MongoDB | Cloudinary Full Stack Video Dashboard

### Getting up and running

#### Prerequisites

1. **NodeJS v6**
    **_Please make sure you are running Node v6 or upwards, or the application will break_**
    Node can be installed and managed using [NVM](https://github.com/creationix/nvm) or other tools
2. MongoDB
    MongoDB needs to be running. Installation instructions [here](https://docs.mongodb.com/getting-started/shell/installation/)
3. Active Internet Connection
    This application depends on Cloudinary, and needs an active internet connection to fetch data from the cloud. This feature can of course be swapped out, but for demo purposes, this is a prerequisite.

#### Installation
1. Unzip this folder or clone `https://github.com/nik-john/angular-video-dashboard/``
2. `cd` into the folder and run `npm install` from the root directory
3. Run `npm run server` - this starts up the backend server.
4. Open a new tab and run `npm run frontend` - this starts up the frontend server.
5. Your browser will automatically be opened and directed to the browser-sync proxy address
6. To prepare assets for production, run the `npm run build` script (Note: the production task does not fire up the express server, and won't provide you with browser-sync's live reloading. Simply use `npm run dev` during development. More information below)


### Folder structure

1. `/` contains ExpressJS server code
2. `/client` contains frontend code

### Tests

1. Run `npm run test` to fire up the Karma - Jasmine test suite. All unit tests should be green.


### AngularJS

AngularJS is a MVW (Model-View-Whatever) Javascript Framework for creating single-page web applications. In this project, it is used for all the application routing as well as all of the frontend views and logic.

The AngularJS files are all located within `/app/js`, structured in the following manner:

```
/controllers
  index.js   (the main module on which all controllers will be mounted, loaded in main.js)
  example.js
/directives
  index.js   (the main module on which all directives will be mounted, loaded in main.js)
  example.js
/filters
  index.js (the main module on which all filters will be mounted, loaded in main.js)
  example.js
/services
  index.js   (the main module on which all services will be mounted, loaded in main.js)
  example.js
constants.js  (any constant values that you want to make available to Angular)
main.js       (the main file read by Browserify, also where the application is defined and bootstrapped)
on_run.js     (any functions or logic that need to be executed on app.run)
on_config.js  (all route definitions and any logic that need to be executed on app.config)
templates.js  (this is created via Gulp by compiling your views, and will not be present beforehand)
```

##### Module organization

Controllers, services, directives, etc. are all be placed within their respective folders, and are automatically required and mounted via their respective `index.js` using `bulk-require`. All modules must export an object of the format:

```javascript
const ExampleModule = function() {};

export default {
  name: 'ExampleModule',
  fn: ExampleModule
};

```

##### Dependency injection

Dependency injection is carried out with the `ng-annotate` library. In order to take advantage of this, a simple directive prologue of the format:

```js
function MyService($http) {
  'ngInject';
  ...
}
```

is added at the very beginning of any Angular functions/modules.

The Gulp tasks will then take care of adding any dependency injection, requiring you to only specify the dependencies within the function parameters and nothing more.

---

### SASS

SASS, standing for 'Syntactically Awesome Style Sheets', is a CSS extension language adding things like extending, variables, and mixins to the language. This boilerplate provides a barebones file structure for your styles, with explicit imports into `app/styles/main.scss`. A Gulp task (discussed later) is provided for compilation and minification of the stylesheets based on this file.

---

### Browserify

Browserify is a Javascript file and module loader, allowing you to `require('modules')` in all of your files in the same manner as you would on the backend in a node.js environment. The bundling and compilation is then taken care of by Gulp, discussed below.

---

### Gulp

Gulp is a "streaming build system", providing a very fast and efficient method for running your build tasks.

---

### Cloudinary

Cloudinary is a Media Storage and Manipulation service. In this project, cloudinary has been used to generate thumbnails on the fly, optimize video  quality (and therefore speed). No setup is required, as the media is residing on my personal cloud.

##### Web Server

Gulp is used here to provide a very basic node/Express web server for viewing and testing your application as you build. It serves static files from the `build/` directory, leaving routing up to AngularJS. All Gulp tasks are configured to automatically reload the server upon file changes. The application is served to `localhost:3002` once you run the `npm run dev` script. To take advantage of the fast live reload injection provided by browser-sync, you must load the site at the proxy address (within this boilerplate will by default be `localhost:3000`). To change the settings related to live-reload or browser-sync, you can access the UI at `localhost:3001`.
