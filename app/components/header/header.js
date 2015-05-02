angular.module('headerModule')
  .controller('HeaderCtrl', ['$scope', 'ModalService', '$rootScope', 'UserService',
  function ($scope, ModalService, $rootScope, UserService) {

    $scope.showLogin = function () {

      ModalService.showModal({
        templateUrl: "components/header/login.html",
        controller: "LoginCtrl"
      }).then(function(modal) {
        modal.element.modal();
        modal.close.then(function(result) {
          UserService.authenticate(result);
        });
      });

    };

    $scope.showJoin = function () {

      ModalService.showModal({
        templateUrl: "components/header/join.html",
        controller: "JoinCtrl"
      }).then(function(modal) {
        modal.element.modal();
        modal.close.then(function(result) {
          console.log("test", result);
          if (result !== 'Cancel') {
            console.log("in header", result);
            UserService.register({display: result.display, email: result.email, password: result.password, region: $rootScope.region}).$promise.then(function (res) {
              console.log(res);
            });
          }
        }, function (err) {
          console.log("err", err);
        });
      });

    };

    $scope.logout = function () {
      UserService.logout();
    }
  }]);
