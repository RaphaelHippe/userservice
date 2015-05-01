angular.module('headerModule')
  .controller('JoinCtrl', function ($scope, close) {
    $scope.joinForm = {
      display: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
    $scope.close = function (result) {
      close(result);
    };
  });
