var module = angular.module('leagueModule', ['ui.select', 'ngSanitize']);
var apiKey = "5801c4b7-bde8-4bfe-b071-89881d00a06c";

module.controller('LeaguesCtrl', function ($scope, $http, GameService, ChampionService, PlayerService, StatsService) {
  $('#spinner').hide();
  $('#playerTitle').hide();
  $scope.gameData;
  $scope.player;
  $scope.players = ["OberstK", "Mindmesser", "TlC Youchra"];
  $scope.roles = ["Top", "Jungle", "Mid", "ADC", "Support"];

  ChampionService.getAllChampions().then(function(res){
    $scope.champions = res;
  })

  $scope.search = function(player){
    $('#playerTitle').show();
    $scope.player = player;
    $('#spinner').show();
    GameService.getGamesForPlayer(player).then(function(data){
      $scope.data = data;
      $('#spinner').hide();
    });
  }

  $scope.timeConvert = function(time){
    var date = new Date(time);
    return date.toString();
  }

  $scope.print = function(){
    console.log($scope.gameData);
  }

  $scope.chooseGame = function(game){
    var playerArray = buildAPISumIDArray(game);
    PlayerService.getPlayerNamesByIdArray(playerArray).then(function(playersRes){
      StatsService.getPlayerStatsForGame(game.id).then(function(statsRes){
        angular.forEach(game.teams.team1, function(player){
          angular.forEach(playersRes, function(name, id){
            if(player.summonerId == id){
              player.name = name;
            }
          });
          angular.forEach(statsRes, function(item){
            statsExtractor(player, item, 100);
          });
        });
        angular.forEach(game.teams.team2, function(player){
          angular.forEach(playersRes, function(name, id){
            if(player.summonerId == id){
              player.name = name;
            }
          });
          angular.forEach(statsRes, function(item){
            statsExtractor(player, item, 200);
          });
        });
        $scope.gameData = game;
      });
    });
  }
});

function statsExtractor(player, item, team){
  if(player.championId == item.championId && item.teamId == team){
    player.kills = item.stats.kills;
    player.assists = item.stats.assists;
    player.deaths = item.stats.deaths;
    player.cs = item.stats.minionsKilled+item.stats.neutralMinionsKilled;
    if(item.timeline.lane == "BOTTOM"){
      if(item.timeline.role == "DUO_CARRY"){
        player.role = "ADC";
      }else if(item.timeline.role == "DUO_SUPPORT"){
        player.role = "Support";
      }
    }else if(item.timeline.lane == "JUNGLE"){
      player.role = "Jungle";
    }else if(item.timeline.lane == "TOP"){
      player.role = "Top";
    }else if(item.timeline.lane == "MID" || item.timeline.lane == "MIDDLE"){
      player.role = "Mid";
    }
  }
}

module.factory("ChampionService", function($http){
  var champService = {
    getAllChampions: function(){
      var promise = $http.get('https://global.api.pvp.net/api/lol/static-data/euw/v1.2/champion?api_key='+apiKey, { cache: true}).then(function(riotResponse){
        var result = [];
        angular.forEach(riotResponse.data.data, function(value){
          result.push(value.name);
        });
        result.sort();
        return result;
      });
      return promise
    },
    getChampionNameForId: function(id){
      var promise = $http.get('https://global.api.pvp.net/api/lol/static-data/euw/v1.2/champion/'+id+'?api_key='+apiKey, { cache: true}).then(function(riotResponse){
        return riotResponse.data.name;
      });
      return promise
    },
    getImage: function(cId){
      var promise = $http.get('https://global.api.pvp.net/api/lol/static-data/euw/v1.2/champion/"+cId+"?champData=image&api_key='+apiKey, { cache: true}).then(function(riotResponse) {
          return riotResponse.data["image"].full;
      });
      return promise;grun
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
      var promise = $http.get('https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/by-name/'+playerName+'?api_key='+apiKey, { cache: true}).then(function(riotResponse) {
        sumId = riotResponse.data[playerName.toLowerCase().replace(/\s+/g, '')].id;
      }).then(function() {
        var promise = $http.get('https://euw.api.pvp.net/api/lol/euw/v1.3/game/by-summoner/'+sumId+'/recent?api_key='+apiKey, { cache: true}).then(function(riotResponse) {
          data = riotResponse.data.games;
          angular.forEach(data, function(game){
            var gameObj = {teams:{team1:{},team2:{}}};
            var players = game.fellowPlayers;
            players.push({"summonerId": sumId, "teamId": game.teamId, "championId": game.championId});
            var teamPlayerObjects = resolvePlayersIntoTeams(players);
            gameObj.teams.team1 = teamPlayerObjects[0];
            gameObj.teams.team2 = teamPlayerObjects[1];
            gameObj["time"] = game.createDate;
            gameObj["type"] = game.gameType;
            gameObj["subtype"] = game.subType;
            gameObj["id"] = game.gameId;
            angular.forEach(gameObj.teams, function(team){
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
      var promise = $http.get('https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/'+idString+'/name?api_key='+apiKey, { cache: true}).then(function(riotResponse){
        return riotResponse.data;
      });
      return promise
    }
  }
  return playerService;
});

module.factory("StatsService", function($http){
  var statsService = {
    getPlayerStatsForGame: function(game){
      var promise = $http.get('https://euw.api.pvp.net/api/lol/euw/v2.2/match/'+game+'?includeTimeline=false&api_key='+apiKey, { cache: true}).then(function(riotResponse){
        return riotResponse.data.participants;
      });
      return promise
    }
  }
  return statsService;
});

module.directive('playerDataDir', function() {
    return {
        restrict: 'EA',
        scope: false,
        template: function(elem, attr){
          return  '<tr>' +
                  '<td style="width:15%;" ng-model="gameData.teams.team'+attr.team+'.player'+attr.player+'.role">' +
                  '<ui-select theme="selectize" ng-disabled="disabled">'+
                  '<ui-select-match placeholder="Role">{{$select.selected}}</ui-select-match>' +
                  '<ui-select-choices repeat="role in roles">' +
                  '<span ng-bind-html="role"></span>' +
                  '</ui-select-choices>' +
                  '</ui-select>' +
                  '</td>' +
                  '<td style="width:15%;" ng-model="gameData.teams.team'+attr.team+'.player'+attr.player+'.champion">' +
                  '<ui-select theme="selectize" ng-disabled="disabled">'+
                  '<ui-select-match placeholder="Champion">{{$select.selected}}</ui-select-match>' +
                  '<ui-select-choices repeat="champion in champions | filter: $select.search">' +
                  '<span ng-bind-html="champion"></span>' +
                  '</ui-select-choices>' +
                  '</ui-select>' +
                  '</td>' +
                  '<td>' +
                  '<input ng-model="gameData.teams.team'+attr.team+'.player'+attr.player+'.name" type="text" class="form-control" aria-label="...">' +
                  '</td>' +
                  '<td>' +
                  '<input ng-model="gameData.teams.team'+attr.team+'.player'+attr.player+'.kills" type="text" class="form-control" aria-label="...">' +
                  '</td>' +
                  '<td>' +
                  '<input ng-model="gameData.teams.team'+attr.team+'.player'+attr.player+'.deaths" type="text" class="form-control" aria-label="...">' +
                  '</td>' +
                  '<td>' +
                  '<input ng-model="gameData.teams.team'+attr.team+'.player'+attr.player+'.assists" type="text" class="form-control" aria-label="...">' +
                  '</td>' +
                  '<td>' +
                  '<input ng-model="gameData.teams.team'+attr.team+'.player'+attr.player+'.cs" type="text" class="form-control" aria-label="...">' +
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

function buildAPISumIDArray(game){
  var playerArray = [];
  angular.forEach(game.teams.team1, function(player){
    playerArray.push(player.summonerId);
  });
  angular.forEach(game.teams.team2, function(player){
    playerArray.push(player.summonerId);
  });
  return playerArray;
}
