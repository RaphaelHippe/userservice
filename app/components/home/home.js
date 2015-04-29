angular.module('homeModule')
  .controller('HomeCtrl', function ($scope, $timeout) {
    $scope.morganaSpeechBubble = false;
    $scope.akaliSpeechBubble = false;


    $scope.akalispeak = function () {
      $timeout(function () {
        $scope.akaliSpeechBubble = true;
        console.log("Mark acquired.");
      }, 3000);
      $timeout(function () {
        $scope.akaliSpeechBubble = false;
        console.log("akali - out");
      }, 6000);
    }

    $scope.morganaspeak = function () {
      console.log("Not all angels are good!");
      $scope.morganaSpeechBubble = true;
      $timeout(function () {
        $scope.morganaSpeechBubble = false;
      }, 3000);
    }

    $scope.akalispeak();
  });
