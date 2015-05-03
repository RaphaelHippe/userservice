'use strict';

/**
 * @ngdoc service
 * @name exampleApp.userService
 * @description
 * # userService
 * Service in the exampleApp.
 */
angular.module('userModule')
  .factory('UserService', ['Session', 'User', '$q', 'localStorageService',
   function (Session, User, $q, localStorageService) {
    var usr = {};
    usr._eventScope = null;

    // instead of http / resource
    usr._user = {
      admin_group: 'none',
      created_at: "2015-04-02 10:26:43",
      password: 'admin',
      disabled: 0,
      display: "admin",
      email: "admin@competeleague.com",
      id: 1,
      league_id: 0,
      team_id: 1,
      updated_at: "2015-04-02 10:26:43",
      member_group: "player"
    };
    usr._user1 = {
      admin_group: 'none',
      created_at: "2015-04-02 10:26:43",
      password: 'player',
      disabled: 0,
      display: "player",
      email: "player@competeleague.com",
      id: 2,
      league_id: 0,
      team_id: 1,
      updated_at: "2015-04-02 10:26:43",
      member_group: "player"
    };
    usr._user2 = {
      admin_group: 'none',
      created_at: "2015-04-02 10:26:43",
      password: 'captain',
      disabled: 0,
      display: "captain",
      email: "captain@competeleague.com",
      id: 3,
      league_id: 0,
      team_id: 1,
      updated_at: "2015-04-02 10:26:43",
      member_group: "player"
    };
    usr._user3 = {
      admin_group: 'none',
      created_at: "2015-04-02 10:26:43",
      password: 'base',
      disabled: 0,
      display: "base",
      email: "base@competeleague.com",
      id: 4,
      league_id: 0,
      team_id: 1,
      updated_at: "2015-04-02 10:26:43",
      member_group: "base"
    };
    usr._accounts = [usr._user, usr._user2, usr._user3];
    usr._sessionId = 1;
    usr._myEventScope;
    usr._myUserScope;

    // helper functions
    var setCurrentUser = function (user) {
      usr._myUserScope.currentUser = user;
    };

    // API usage

    // old fake data authenticate
    // usr.authenticate = function (credentials) {
    //   for (var i = 0; i < usr._accounts.length; i++) {
    //     if (usr._accounts[i].email === credentials.email &&
    //         usr._accounts[i].password === credentials.password) {
    //           Session.create(usr._sessionId, usr._accounts[i].id, usr._accounts[i].member_group);
    //           // usr._myEventScope.$broadcast(USER_EVENTS.loginSuccess);
    //           localStorageService.set('user', usr._accounts[i]);
    //           setCurrentUser(usr._accounts[i]);
    //           return usr._accounts[i];
    //     }
    //   }
    //       // usr._myEventScope.$broadcast(USER_EVENTS.loginFailed);
    //       return null;
    // };

    usr.authenticate = function (credentials) {
      console.log(credentials);
      User.authenticate({email: credentials.email, password: credentials.password}).$promise.then(function (res) {
        // Session.create(usr._sessionId, usr._accounts[1].id, usr._accounts[1].member_group);
        localStorageService.set('user', res.data);
        setCurrentUser(res.data);
        return res.data;
      }, function () {
        return null
      })
    };

    usr.logout = function () {
      setCurrentUser(null);
      localStorageService.set('user', null);
      Session.destroy();
    };

    usr.setEventScope = function (scope) {
      usr._myEventScope = scope;
    };

    usr.setUserScope = function (scope) {
       usr._myUserScope = scope;
       usr._myUserScope.currentUser = localStorageService.get('user');
    };

    usr.getAllUsers = function () {
      var returnArray = [];
      var promises = [];
      var promise = User.query().$promise.then(function (res) {
        res.forEach(function(key) {
            returnArray.push(key);
            console.log(key);
        });
        return returnArray;
      })
      // console.log("promise", promise);
      return promise;
    };

    usr.getUserById = function (id) {
      return User.get(id);
    };

    usr.register = function (display, email, password, region) {
      return User.register(display, email, password, region);
    }

    // public API
    return {
      authenticate: function (credentials) {
        return usr.authenticate(credentials);
      },
      logout: function () {
        return usr.logout();
      },
      setEventScope: function (scope) {
        return usr.setEventScope(scope);
      },
      setUserScope: function (scope) {
        return usr.setUserScope(scope);
      },
      getAllUsers: function () {
        return usr.getAllUsers();
      },
      getUserById: function (id) {
        return usr.getUserById(id);
      },
      register: function (display, email, password, region) {
        return usr.register(display, email, password, region)
      },
    }

  }]);



      // isLoggedIn: function () {
      //   return usr.isLoggedIn();
      // },
      // isAuthorized: function (authorizedRoles) {
      //   return usr.isAuthorized(authorizedRoles);
      // },



      // usr.isLoggedIn = function () {
      //   return !!Session.userId;
      // };

      // usr.isAuthorized = function (authorizedRoles) {
      //   if (!angular.isArray(authorizedRoles)) {
      //       authorizedRoles = [authorizedRoles];
      //     }
      //     return (usr.isLoggedIn() &&
      //       authorizedRoles.indexOf(Session.userRole) !== -1);
      //   };
