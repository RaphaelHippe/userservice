'use strict';

/**
 * @ngdoc service
 * @name exampleApp.userService
 * @description
 * # userService
 * Service in the exampleApp.
 */
angular.module('userModule')
  .factory('UserService', function (Session, User,
    $location, $q, localStorageService) {
    var usr = {};
    usr._eventScope = null;

    // instead of http / resource
    usr._user = {
      id: 1,
      name: 'John',
      username: 'admin',
      password: 'admin',
      role: 'admin'
    };
    usr._user2 = {
      id: 2,
      name: 'Mike',
      username: 'user',
      password: 'user',
      role: 'user'
    };
    usr._user3 = {
      id: 3,
      name: 'Anna',
      username: 'user2',
      password: 'user2',
      role: 'user'
    };
    usr._user4 = {
      id: 4,
      name: 'Tom',
      username: 'admin2',
      password: 'admin2',
      role: 'admin'
    };
    usr._accounts = [usr._user, usr._user2, usr._user3, usr._user4];
    usr._sessionId = 1;
    usr._myEventScope;
    usr._myUserScope;

    // helper functions
    var setCurrentUser = function (user) {
      usr._myUserScope.currentUser = user;
    };

    // API usage
    usr.authenticate = function (credentials) {
      for (var i = 0; i < usr._accounts.length; i++) {
        if (usr._accounts[i].username === credentials.username &&
            usr._accounts[i].password === credentials.password) {
              Session.create(usr._sessionId, usr._accounts[i].id, usr._accounts[i].role);
              usr._myEventScope.$broadcast(USER_EVENTS.loginSuccess);
              localStorageService.set('user', usr._accounts[i]);
              setCurrentUser(usr._accounts[i]);
              $location.path(WELCOME_VIEW.path);
              return usr._accounts[i];
        }
      }
          usr._myEventScope.$broadcast(USER_EVENTS.loginFailed);
          return null;
    };

    usr.logout = function () {
      setCurrentUser(null);
      localStorageService.set('user', null);
      $location.path(WELCOME_VIEW.path);
      Session.destroy();
    };

    usr.setEventScope = function (scope) {
      usr._myEventScope = scope;
    };

    usr.setUserScope = function (scope) {
       usr._myUserScope = scope;
       usr._myUserScope.currentUser = localStorageService.get('user');
    };
// dat liam :D unterbricht uns einfach haha
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
      console.log("promise", promise);
      return promise;




      //
      // .$promise.then(function (data) {
      //   console.log("array", array);
      //   console.log("data", data);
      //   angular.forEach(array, function (data) {
      //     console.log("input", data);
      //     var promise = data.then(function (res) {
      //       console.log("hier rein? ", res);
      //       returnArray.push(res);
      //     }, function (error) {
      //       console.log("error", error);
      //     });
      //     promises.push(promise);
      //   });
      //
      // })
      //
      //   var qall = $q.all(promises).then(function () {
      //     console.log("teste",returnArray);
      //     return returnArray;
      //   });
      //   return qall;


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

  });



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
