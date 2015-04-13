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
      .when('/about', {
        templateUrl: 'components/about/about.html',
        controller: 'HomeCtrl' //aboutCtrl
      })
      .when('/leagues', {
        templateUrl: 'components/leagues/leagues.html',
        controller: 'LeaguesCtrl' //leaguesCtrl
      })
      .when('/news', {
        templateUrl: 'components/news/news.html',
        controller: 'HomeCtrl' //newsCtrl
      })
      .when('/sponsors', {
        templateUrl: 'components/sponsors/sponsors.html',
        controller: 'HomeCtrl' //sponsorsCtrl
      })
      .when('/contact', {
        templateUrl: 'components/contact/contact.html',
        controller: 'HomeCtrl' //contactCtrl
      })
    /* PP and TAC*/
      .when('/privacyPolicy',{
        templateUrl: 'components/privacyPolicy/privacyPolicy.html',
        controller: 'HomeCtrl' //privacyPolicyCtrl
      })
      .when('/termsAndConditions', {
        templateUrl: 'components/termsAndConditions/termsAndConditions.html',
        controller: 'HomeCtrl' //termsAndConditionsCtrl
      })
    /* LEAGUES ROUTES*/
    .when('/leaguesSilverPremier', {
        templateUrl: 'components/leagues/leaguesDetails.html',
        controller: 'HomeCtrl' //silverPremierCtrl
    })
    .when('/leaguesPlatinumPremier', {
        templateUrl: 'components/leagues/leaguesDetails.html',
        controller: 'HomeCtrl' //platinumPremierCtrl
    })
    .when('/leaguesDiamondPremier', {
        templateUrl: 'components/leagues/leaguesDetails.html',
        controller: 'HomeCtrl' //diamondPremierCtrl
    })
    .when('/leaguesSilverOpen', {
        templateUrl: 'components/leagues/leaguesDetails.html',
        controller: 'HomeCtrl' //silverOpenCtrl
    })
    .when('/leaguesPlatinumOpen', {
        templateUrl: 'components/leagues/leaguesDetails.html',
        controller: 'HomeCtrl' //platinumOpenCtrl
    })
    .when('/leaguesDiamondOpen', {
        templateUrl: 'components/leagues/leaguesDetails.html',
        controller: 'HomeCtrl' //diamondOpenCtrl
    })
      .otherwise({
        redirectTo: '/'
      })
  })
