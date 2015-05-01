angular.module('freeAgentDatabaseModule')
  .controller('freeAgentDatabaseCtrl', ['$scope', 'freeAgentDatabaseService',
   function ($scope, freeAgentDatabaseService) {

    $scope.freeAgents = freeAgentDatabaseService.getFreeAgents();

    console.log("freeAgentDatabase", $scope.freeAgents);

  }]);
