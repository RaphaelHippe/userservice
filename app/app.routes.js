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
        controller: 'HomeCtrl' //leaguesCtrl
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
      .when('/privacy-policy',{
        templateUrl: 'components/privacyPolicy/privacyPolicy.html',
        controller: 'HomeCtrl' //privacyPolicyCtrl
      })
      .when('/terms-and-conditions', {
        templateUrl: 'components/termsAndConditions/termsAndConditions.html',
        controller: 'HomeCtrl' //termsAndConditionsCtrl
      })
    /* LEAGUES ROUTES*/
    .when('/leagues-silver-premier', {
        templateUrl: 'components/leagues/leaguesDetails.html',
        controller: 'HomeCtrl' //silverPremierCtrl
    })
    .when('/leagues-platinum-premier', {
        templateUrl: 'components/leagues/leaguesDetails.html',
        controller: 'HomeCtrl' //platinumPremierCtrl
    })
    .when('/leagues-diamond-premier', {
        templateUrl: 'components/leagues/leaguesDetails.html',
        controller: 'HomeCtrl' //diamondPremierCtrl
    })
    .when('/leagues-silver-open', {
        templateUrl: 'components/leagues/leaguesDetails.html',
        controller: 'HomeCtrl' //silverOpenCtrl
    })
    .when('/leagues-platinum-open', {
        templateUrl: 'components/leagues/leaguesDetails.html',
        controller: 'HomeCtrl' //platinumOpenCtrl
    })
    .when('/leagues-diamond-open', {
        templateUrl: 'components/leagues/leaguesDetails.html',
        controller: 'HomeCtrl' //diamondOpenCtrl
    })
    /* PROFILE AND ACCOUNT */
    .when('/profile:id', {
        templateUrl: 'components/profile/profile.html',
        controller: 'ProfileCtrl',
        // resolve: {
        //   profileUser: function ($routeParams, UserService) {
        //     UserService.getUserById({id: $routeParams.id}).$promise.then(function (res) {
        //       console.log('ngroute', res);
        //       return res;
        //     })
        //   }
        // }
    })
    .when('/account', {
        templateUrl: 'components/account/account.html',
        controller: 'AccountCtrl'
    })
    /* FreeAgentDatabase*/
    .when('/free-agent-database', {
        templateUrl: 'components/freeagentdatabase/freeAgentDatabaseView.html',
        controller: 'freeAgentDatabaseCtrl'
    })
      .otherwise({
        redirectTo: '/'
      })
  })
