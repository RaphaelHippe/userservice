/*
  Here we will declare all the routes. Routes are part of the baseModule.
*/
angular.module('baseModule')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'components/home/home.html',
        controller: 'HomeCtrl'
      })
      .otherwise({
        redirectTo: '/'
      })
  })
