import angular from 'angular';

// angular modules
import constants from './constants';
import onConfig  from './on_config';
import onRun     from './on_run';
import 'angular-ui-router';
import 'ngstorage';
import 'angular-sanitize';
import 'videogular';
import 'videogular-overlay-play';
import 'videogular-poster';
import 'videogular-controls';
import './templates';
import './filters';
import './controllers';
import './services';
import './directives';
import 'angular-jk-rating-stars';
import 'ng-infinite-scroll';
// create and bootstrap application
const requires = [
  'ui.router',
  'ngStorage',
  'ngSanitize',
	'com.2fdevs.videogular',
	'com.2fdevs.videogular.plugins.overlayplay',
  'com.2fdevs.videogular.plugins.poster',
  'com.2fdevs.videogular.plugins.controls',
  'jkAngularRatingStars',
  'templates',
  'app.filters',
  'app.controllers',
  'app.services',
  'app.directives',
  'infinite-scroll'
];

// mount on window for testing
window.app = angular.module('app', requires);

angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 500);

angular.module('app').constant('AppSettings', constants);

angular.module('app').config(onConfig);

angular.module('app').run(onRun);

angular.bootstrap(document, ['app'], {
  strictDi: true
});
