angular.module('headerModule')
  .controller('LoginCtrl', ['$scope', 'close',
   function ($scope, close) {
    $scope.credentials = {
      email: '',
      password: ''
    };
    // $scope.$on(USER_EVENTS.loginFailed, $scope.setLoginFailed);
    $scope.close = function (result) {
      console.log("test in loginjs", result);
      close(result);
    };

  }]);
