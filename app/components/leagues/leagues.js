var module = angular.module('leagueModule', ['ui.select', 'ngSanitize']);

module.controller('LeaguesCtrl', function ($scope, $http, ChampionImageService) {
  var sumId;
  var data;
  var champions = [];
  $scope.gameData = {team1: {
                      players:{ player1:{},
                                player2:{},
                                player3:{},
                                player4:{},
                                player5:{}}
                      },
                     team2: {
                      players:{ player1:{},
                                player2:{},
                                player3:{},
                                player4:{},
                                player5:{}}
                      }
                    };
  $scope.players = ["OberstK", "Mindmesser"];
  $scope.roles = [{name: "Top"},
                  {name: "Jungle"} ,
                  {name: "Mid"},
                  {name: "ADC"},
                  {name: "Support"}
                  ];

  $scope.search = function(player){
    $http.get('https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/by-name/'+player+'?api_key=466e64cb-39cc-4832-afc4-f4c1cc017533').then(function(riotResponse) {
      sumId = riotResponse.data[player.toLowerCase()].id;
    }).then(function() {
      console.log(sumId);
      $http.get('https://euw.api.pvp.net/api/lol/euw/v1.3/game/by-summoner/'+sumId+'/recent?api_key=466e64cb-39cc-4832-afc4-f4c1cc017533').then(function(riotResponse) {
        data = riotResponse.data["games"];

        angular.forEach(data, function(game){
          game.images = [];
          var champions = [];
          champions.push(game.championId);
          for(var player in game.fellowPlayers){
            champions.push(game.fellowPlayers[player].championId);
          }
          angular.forEach(champions, function(key){
            console.log(key);
            ChampionImageService.getImage(key).then(function(data) {
              game.images.push(data);
            });
          });
        });
      }).then(function(){
        $scope.matches = data;
        console.log(data);
      });
    });
  }

  $scope.timeConvert = function(time){
    var date = new Date(time);
    return date.toString();
  }

  $scope.print = function(){
    console.log($scope.gameData);
  }
});

module.factory("GameService", function(){
  var gameService = {

  };
  return gameService;
});

module.factory("ChampionImageService", function($http){
  var champImgService = {
    getImage: function(cId){
      var promise = $http.get("https://global.api.pvp.net/api/lol/static-data/euw/v1.2/champion/"+cId+"?champData=image&api_key=466e64cb-39cc-4832-afc4-f4c1cc017533").then(function(riotResponse) {
          return riotResponse.data["image"].full;
      });
      return promise;
    }
  };
  return champImgService;
});
