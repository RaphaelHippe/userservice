angular.module('freeAgentDatabaseModule')
  .controller('freeAgentDatabaseCtrl', function ($scope, freeAgentDatabaseService) {

    $scope.freeAgents = freeAgentDatabaseService.getFreeAgents();

    console.log("freeAgentDatabase", $scope.freeAgents);

  });
