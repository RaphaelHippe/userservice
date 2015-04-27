var module = angular.module('headerModule', []);

module.controller('HeaderCtrl', function ($scope, TwitchService) {
  $scope.twitchStatus;

  TwitchService.getStatusOfCLTwitchStream().then(function(online){
    if(online){
      $scope.twitchStatus = "twitchNavLive";
    }else{
      $scope.twitchStatus = "twitchNavOff";
    }
  });
});

module.factory("TwitchService", function($http){
  var twitchService = {
    getStatusOfCLTwitchStream: function(game){
      var promise = $http.jsonp('https://api.twitch.tv/kraken/streams/competeleague?callback=JSON_CALLBACK', { cache: true }).then(function(riotResponse){
        if(riotResponse.data.stream != null){
          return true;
        }else{
          return false;
        }
      });
      return promise
    }
  }
  return twitchService;
});
