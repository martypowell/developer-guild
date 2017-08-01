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

        $routeProvider
          .when('/members', {
            templateUrl: 'members/members.html',
            controller: 'MembersCtrl'
          }).when('/member/:name', {
            templateUrl: 'members/member.html',
            controller: 'MemberCtrl'
          }).when('/tools', {
            templateUrl: 'tools/tools.html',
            controller: 'ToolsCtrl'
          }).otherwise({
            redirectTo: '/members'
          });
      }]);
})();