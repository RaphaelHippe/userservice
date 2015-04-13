angular.module('leagueModule')
  .controller('LeaguesCtrl', function ($scope, $http) {
    var sumId;
    var data;
    var champions = [];
    $scope.search = function(){
      $scope.searchName = "OberstK"
      $http.get('https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/by-name/'+$scope.searchName+'?api_key=466e64cb-39cc-4832-afc4-f4c1cc017533').then(function(riotResponse) {
        sumId = riotResponse.data[$scope.searchName.toLowerCase()].id;
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
              $http.get("https://global.api.pvp.net/api/lol/static-data/euw/v1.2/champion/"+key+"?champData=image&api_key=466e64cb-39cc-4832-afc4-f4c1cc017533").then(function(riotResponse) {
                game.images.push(riotResponse.data["image"].full);
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
  });
