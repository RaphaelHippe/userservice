angular.module('headerModule')
  .controller('HeaderCtrl', function ($scope, ModalService, UserService) {

    

    $scope.showLogin = function () {

      ModalService.showModal({
        templateUrl: "components/header/login.html",
        controller: "LoginCtrl"
      }).then(function(modal) {

        //it's a bootstrap element, use 'modal' to show it
        modal.element.modal();
        modal.close.then(function(result) {
          console.log(result);
        });
      });

    };

    $scope.showJoin = function () {

      ModalService.showModal({
        templateUrl: "components/header/join.html",
        controller: "JoinCtrl"
      }).then(function(modal) {

        //it's a bootstrap element, use 'modal' to show it
        modal.element.modal();
        modal.close.then(function(result) {
          console.log(result);
        });
      });

    };



        $scope.registerUser = function () {
          UserService.register({display: "youchra3", email: "youchra3@competeleague.com", password: "Password123", region:"EU"}).$promise.then(function (res) {
            console.log(res);
          });
        }




  });
