'use strict';

/**
 * @ngdoc service
 * @name exampleApp.session
 * @description
 * # session
 * Service in the exampleApp.
 */
angular.module('userModule')
  .service('Session', function () {
    this.create = function (sessionId, userId, userRole) {
      this.id = sessionId;
      this.userId = userId;
      this.userRole = userRole;
    };
    this.destroy = function () {
      this.id = null;
      this.userId = null;
      this.userRole = null;
    };
  });
