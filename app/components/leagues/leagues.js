var module = angular.module('leagueModule', ['ui.select', 'ngSanitize']);

module.controller('LeaguesCtrl', function ($scope, $http, GameService, ChampionService, PlayerService) {
  $('#spinner').hide();
  $('#playerTitle').hide();
  var sumId;
  var data;
  $scope.loading;
  $scope.gameData;
  $scope.player;
  $scope.players = ["OberstK", "Mindmesser"];
  $scope.roles = [{name: "Top"},
                  {name: "Jungle"} ,
                  {name: "Mid"},
                  {name: "ADC"},
                  {name: "Support"}
                  ];

  ChampionService.getAllChampions().then(function(res){
    $scope.champions = res;
  })

  $scope.search = function(player){
    $('#playerTitle').show();
    $scope.player = player;
    $('#spinner').show();
    GameService.getGamesForPlayer(player).then(function(data){
      $scope.data = data;
      $scope.loading = false;
      $('#spinner').hide();
    });
  }

  $scope.timeConvert = function(time){
    var date = new Date(time);
    return date.toString();
  }

  $scope.print = function(){
    console.log($scope.gameData);
    console.log($scope.champions);
  }

  $scope.chooseGame = function(game){
    var playerArray = [];
    angular.forEach(game.team1, function(player){
      playerArray.push(player.summonerId);
    });
    angular.forEach(game.team2, function(player){
      playerArray.push(player.summonerId);
    });
    PlayerService.getPlayerNamesByIdArray(playerArray).then(function(res){
      angular.forEach(game.team1, function(player){
        angular.forEach(res, function(name, id){
          if(player.summonerId == id){
            player.name = name;
          }
        });
      });
      angular.forEach(game.team2, function(player){
        angular.forEach(res, function(name, id){
          if(player.summonerId == id){
            player.name = name;
          }
        });
      });
      $scope.gameData = game;
    });
  }
});

module.factory("ChampionService", function($http){
  var champService = {
    getAllChampions: function(){
      var promise = $http.get('https://global.api.pvp.net/api/lol/static-data/euw/v1.2/champion?api_key=466e64cb-39cc-4832-afc4-f4c1cc017533', { cache: true}).then(function(riotResponse){
        var result = [];
        angular.forEach(riotResponse.data.data, function(value, key){
          result.push(key);
        });
        result.sort();
        return result;
      });
      return promise
    },
    getChampionNameForId: function(id){
      var promise = $http.get('https://global.api.pvp.net/api/lol/static-data/euw/v1.2/champion/'+id+'?api_key=466e64cb-39cc-4832-afc4-f4c1cc017533', { cache: true}).then(function(riotResponse){
        return riotResponse.data.name;
      });
      return promise
    },
    getImage: function(cId){
      var promise = $http.get("https://global.api.pvp.net/api/lol/static-data/euw/v1.2/champion/"+cId+"?champData=image&api_key=466e64cb-39cc-4832-afc4-f4c1cc017533", { cache: true}).then(function(riotResponse) {
          return riotResponse.data["image"].full;
      });
      return promise;
    }
  };
  return champService;
});

module.factory("GameService", function($http, $q, ChampionService){
  var sumId;
  var data;
  var gameData;
  var promises;
  var gameService = {
    getGamesForPlayer: function(playerName){
      gameData = [];
      promises = [];
      var promise = $http.get('https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/by-name/'+playerName+'?api_key=466e64cb-39cc-4832-afc4-f4c1cc017533', { cache: true}).then(function(riotResponse) {
        sumId = riotResponse.data[playerName.toLowerCase()].id;
      }).then(function() {
        var promise = $http.get('https://euw.api.pvp.net/api/lol/euw/v1.3/game/by-summoner/'+sumId+'/recent?api_key=466e64cb-39cc-4832-afc4-f4c1cc017533', { cache: true}).then(function(riotResponse) {
          data = riotResponse.data["games"];
          angular.forEach(data, function(game){
            var gameObj = {team1:{},
                            team2:{}};
            var players = game.fellowPlayers;
            players.push({"summonerId": sumId, "teamId": game.teamId, "championId": game.championId});
            var teamPlayerObjects = resolvePlayersIntoTeams(players);
            gameObj.team1 = teamPlayerObjects[0];
            gameObj.team2 = teamPlayerObjects[1];
            gameObj["time"] = game.createDate;
            angular.forEach(gameObj, function(team){
              angular.forEach(team, function(player){
                promises.push(ChampionService.getImage(player.championId).then(function(data) {
                  player["image"] = data;
                }));
                promises.push(ChampionService.getChampionNameForId(player.championId).then(function(data) {
                  player["champion"] = data;
                }));
              });
            });
            gameData.push(gameObj);
          });
          var promise = $q.all(promises).then(function(){
            return gameData;
          });
          return promise
        });
        return promise;
      });
      return promise;
    }
  };
  return gameService;
});

module.factory("PlayerService", function($http){
  var playerService = {
    getPlayerNamesByIdArray: function(array){
      var idString = "";
      array.forEach(function(id){
        idString = idString + id+",";
      });
      var promise = $http.get('https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/'+idString+'/name?api_key=466e64cb-39cc-4832-afc4-f4c1cc017533', { cache: true}).then(function(riotResponse){
        return riotResponse.data;
      });
      return promise
    }
  }
  return playerService;
});

module.directive('playerDataDir', function() {
    return {
        restrict: 'EA',
        scope: false,
        template: function(elem, attr){
          return  '<tr>' +
                  '<td style="width:10%;" ng-model="gameData.team'+attr.team+'.player'+attr.player+'.role">' +
                  '<ui-select theme="selectize" ng-disabled="disabled">'+
                  '<ui-select-match placeholder="Role">{{$select.selected.name}}</ui-select-match>' +
                  '<ui-select-choices repeat="role in roles">' +
                  '<span ng-bind-html="role.name"></span>' +
                  '</ui-select-choices>' +
                  '</ui-select>' +
                  '</td>' +
                  '<td style="width:15%;" ng-model="gameData.team'+attr.team+'.player'+attr.player+'.champion">' +
                  '<ui-select theme="selectize" ng-disabled="disabled">'+
                  '<ui-select-match placeholder="Champion">{{$select.selected}}</ui-select-match>' +
                  '<ui-select-choices repeat="champion in champions">' +
                  '<span ng-bind-html="champion"></span>' +
                  '</ui-select-choices>' +
                  '</ui-select>' +
                  '</td>' +
                  '<td>' +
                  '<input ng-model="gameData.team'+attr.team+'.player'+attr.player+'.name" type="text" class="form-control" aria-label="...">' +
                  '</td>' +
                  '<td>' +
                  '<input ng-model="gameData.team'+attr.team+'.player'+attr.player+'.kills" type="text" class="form-control" aria-label="...">' +
                  '</td>' +
                  '<td>' +
                  '<input ng-model="gameData.team'+attr.team+'.player'+attr.player+'.deaths" type="text" class="form-control" aria-label="...">' +
                  '</td>' +
                  '<td>' +
                  '<input ng-model="gameData.team'+attr.team+'.player'+attr.player+'.assists" type="text" class="form-control" aria-label="...">' +
                  '</td>' +
                  '<td>' +
                  '<input ng-model="gameData.team'+attr.team+'.player'+attr.player+'.CS" type="text" class="form-control" aria-label="...">' +
                  '<td>' +
                  '</tr>'
        },
        replace: true
    };
});


function resolvePlayersIntoTeams(players){
  var team1Count = 1;
  var team2Count = 1;
  var team1PlayerObject = {};
  var team2PlayerObject = {};
  var result = [];
  angular.forEach(players, function(player){
    if(player.teamId == "100"){
      team1PlayerObject["player"+team1Count] = {summonerId: player.summonerId, championId: player.championId};
      team1Count++;
    }else if(player.teamId == "200"){
      team2PlayerObject["player"+team2Count] = {summonerId: player.summonerId, championId: player.championId};
      team2Count++;
    }
  });
  result.push(team1PlayerObject);
  result.push(team2PlayerObject);
  return result;
}
