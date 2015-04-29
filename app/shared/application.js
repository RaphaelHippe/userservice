angular.module('baseModule')
  .controller('ApplicationCtrl', function ($scope, $rootScope, $location, UserService) {

    // NA / EU switch
    $rootScope.region = 'EU';

    $scope.switchRegion = function () {
      var myRegion = $rootScope.region;
      if (myRegion === 'EU') {
        $rootScope.region = 'NA';
      }
      if (myRegion === 'NA') {
        $rootScope.region = 'EU';
      }
      console.log('Current Region: ', $scope.region);
    }

    UserService.setEventScope($scope);
    UserService.setUserScope($scope);
    // $scope.userRoles = USER_ROLES;
    // $scope.isAuthorized = UserService.isAuthorized;

    // dev current user to set up account and profile page:
    $scope.currentUser = {
      admin_group: 'none',
      created_at: "2015-04-02 10:26:43",
      disabled: 0,
      display: "Youchra",
      email: "admin@competeleague.com",
      id: 1,
      league_id: 0,
      team_id: 1,
      updated_at: "2015-04-02 10:26:43",
      member_group: "player"
    };

    // dev profile user to set up profile page:
    $scope.profileUser = {
      admin_group: 'none',
      created_at: "2015-04-02 10:26:43",
      disabled: 0,
      display: "Mindmesser",
      email: "admin@competeleague.com",
      id: 2,
      league_id: 0,
      team_id: 1,
      updated_at: "2015-04-02 10:26:43",
      member_group: "player"
    };


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
