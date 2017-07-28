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
  config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({
      redirectTo: '/members'
    });
  }]);
})();