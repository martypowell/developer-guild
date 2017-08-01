(function () {
  'use strict';

  // Declare app level module which depends on views, and components
  angular.module('developmentGuild', [
    'ngRoute',
    'developmentGuild.members'
    //,
    // 'developmentGuild.view2',
    // 'developmentGuild.version'
  ]).
  config(['$locationProvider', '$routeProvider', '$httpProvider', 
    function ($locationProvider, $routeProvider, $httpProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({
      redirectTo: '/members'
    });
  }]);
})();