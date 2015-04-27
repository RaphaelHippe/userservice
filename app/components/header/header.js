angular.module('headerModule')
  .controller('HeaderCtrl', function ($scope, ModalService) {


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




  });
