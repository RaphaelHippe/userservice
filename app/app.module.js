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
    'ngFabForm',
    'ngMessages',
    'freeAgentDatabaseModule'
  ])
  // .config(function (ngFabFormProvider) {
  //   ngFabFormProvider.extendConfig(
  //     {
  //       "validationsTemplate": "default-validation-msgs.html",
  //       "preventInvalidSubmit": true,
  //       "preventDoubleSubmit": true,
  //       "preventDoubleSubmitTimeoutLength": 1000,
  //       "setFormDirtyOnSubmit": true,
  //       "scrollToAndFocusFirstErrorOnSubmit": true,
  //       "scrollAnimationTime": 500,
  //       "scrollOffset": -100,
  //       "disabledForms": true,
  //       "setNovalidate": true,
  //       "setNamesByNgModel": true,
  //       "setAsteriskForRequiredLabel": false,
  //       "asteriskStr": "*",
  //       "validationMsgPrefix": "validationMsg",
  //       "emailRegex": {},
  //       "watchForFormCtrl": false,
  //       "formChangeEvent": "NG_FAB_FORM_OPTIONS_CHANGED"
  //     }
  //   )
  // })
