angular.module('profileModule')
  .controller('ProfileCtrl', ['$scope', '$routeParams', 'UserService',
   function ($scope, $routeParams, UserService) {
    $scope.profileUser = null;

    $scope.getProfileUser = function () {
      UserService.getUserById({id: $routeParams.id}).$promise.then(function (res) {
        $scope.profileUser = res;
        console.log("profile",res);
      })
    };
    $scope.getProfileUser();
  }]);
