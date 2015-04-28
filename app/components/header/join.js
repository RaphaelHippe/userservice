angular.module('headerModule')
  .controller('JoinCtrl', function ($scope, $rootScope, UserService) {
    $scope.joinForm = {
      display: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
    console.log("test", $rootScope.region);
    $scope.registerUser = function () {
      UserService.register({display: $scope.joinForm.display, email: $scope.joinForm.email, password: $scope.joinForm.password, region: $rootScope.region}).$promise.then(function (res) {
        console.log(res);
      });
    }
  });
