angular.module('headerModule')
  .controller('JoinCtrl', ['$scope', 'close', function ($scope, close) {
    $scope.joinForm = {
      display: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsAndConditions: false
    };
    $scope.close = function (result) {
      close(result, 500);
    };

    $scope.customFormOptions = {
      "validationsTemplate": "default-validation-msgs.html",
      "preventInvalidSubmit": true,
      "preventDoubleSubmit": true,
      "preventDoubleSubmitTimeoutLength": 1000,
      "setFormDirtyOnSubmit": true,
      "scrollToAndFocusFirstErrorOnSubmit": true,
      "scrollAnimationTime": 500,
      "scrollOffset": -100,
      "disabledForms": true,
      "setNovalidate": true,
      "setNamesByNgModel": true,
      "setAsteriskForRequiredLabel": false,
      "asteriskStr": "*",
      "validationMsgPrefix": "validationMsg",
      "emailRegex": {},
      "watchForFormCtrl": false,
      "formChangeEvent": "NG_FAB_FORM_OPTIONS_CHANGED"
    };

  }]);
