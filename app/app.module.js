/*
  Here we will declare all modules. The baseModule is the Main module and will
  include all the others modules. Make sure every component gets his own module.

  Also here you can set up the constants (global variables in angular).

  Also make sure you include all Modules into the base module!
*/

// Components
angular.module('homeModule', [])

angular.module('headerModule', [])

angular.module('profileModule', [])

angular.module('accountModule', [])

angular.module('freeAgentDatabaseModule', [])

// Shared
angular.module('sliderModule', [])

angular.module('userModule', [
    'ngResource',
    'LocalStorageModule'
    ])

// Base module
angular.module('baseModule', [
    // 'ngAnimate',
    'ngCookies',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angularModalService',
    'homeModule',
    'headerModule',
    'profileModule',
    'accountModule',
    'sliderModule',
    'userModule',
    'freeAgentDatabaseModule'
  ])
