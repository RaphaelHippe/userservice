angular.module('baseModule')
  .controller('ApplicationCtrl', function ($scope, $rootScope, $location, UserService, localStorageService) {

    // NA / EU switch
    $rootScope.region = localStorageService.get('region') || 'EU';

    $scope.switchRegion = function () {
      var myRegion = $rootScope.region;
      if (myRegion === 'EU') {
        $rootScope.region = 'NA';
        localStorageService.set('region', 'NA');
      }
      if (myRegion === 'NA') {
        $rootScope.region = 'EU';
        localStorageService.set('region', 'EU');
      }
      console.log('Current Region: ', $scope.region);
      console.log("current User", $scope.currentUser);
    }

    UserService.setEventScope($scope);
    UserService.setUserScope($scope);
    $scope.isAuthorized = UserService.isAuthorized;
    // $scope.userRoles = USER_ROLES;

    $scope.users = [];
    $scope.user = {};

    $scope.getUsers = function () {
      // console.log("appl", UserService.getAllUsers());
      UserService.getAllUsers().then(function (res) {
        $scope.users = res;
        // console.log("test");
      })
    }

    $scope.getUser = function () {
      UserService.getUserById({id: 1}).$promise.then(function (res) {
        $scope.user = res;
      }, function (error) {
        // console.log("error", error);
      });
    }
    $scope.getUsers();
    $scope.getUser();
    $scope.testButton = function () {
      console.log('query', $scope.users);
      console.log('get', $scope.user);
      console.log('user[0]', $scope.users[3].display);
    };

    $scope.logout = function () {
      UserService.logout();
    };

    $scope.goTo = function (input) {
      $location.path(input);
    };
  });
