'use strict';

/**
 * @ngdoc service
 * @name exampleApp.userService
 * @description
 * # userService
 * Service in the exampleApp.
 */
angular.module('freeAgentDatabaseModule')
  .factory('freeAgentDatabaseService', function () {

      // DATEN

      var fad = {};

      fad._freeAgentDatabase = [
        {
          name: "Youchra",
          leagueAccount: "TLCYouchra",
          soloQRank: "Silver IV",
          position: "top",
          language: "English, German",
          availability: "daily, 5pm-9pm",
        },
        {
          name: "Papschachtel",
          leagueAccount: "TLCYouchra",
          soloQRank: "Silver IV",
          position: "top",
          language: "English, German",
          availability: "daily, 5pm-9pm",
        },
        {
          name: "Papschachtel",
          leagueAccount: "TLCYouchra",
          soloQRank: "Silver IV",
          position: "top",
          language: "English, German",
          availability: "daily, 5pm-9pm",
        },
        {
          name: "Papschachtel",
          leagueAccount: "TLCYouchra",
          soloQRank: "Silver IV",
          position: "top",
          language: "English, German",
          availability: "daily, 5pm-9pm",
        },
        {
          name: "Papschachtel",
          leagueAccount: "TLCYouchra",
          soloQRank: "Silver IV",
          position: "top",
          language: "English, German",
          availability: "daily, 5pm-9pm",
        },

      ];

      // API USAGE

      fad.getFreeAgents = function () {
        return fad._freeAgentDatabase;
      }

      // PUBLIC API

      return {
        getFreeAgents: function () {
          return fad.getFreeAgents();
        },


      }


    })
