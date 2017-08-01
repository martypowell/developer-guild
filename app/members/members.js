(function (app) {
  'use strict';

  angular.module('developmentGuild.members', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/members', {
        templateUrl: 'members/members.html',
        controller: 'MembersCtrl'
      });
    }])

    .controller('MembersCtrl', ['$scope', '$window', '$log', 'membersService', 'knowledgeService',
      function ($scope, $window, $log, membersService, knowledgeService) {

        var self = this;
        self.members = [];
        self.knowledgeSelection = "";
        self.activeKnowledgeItem = "";

        self.clearFilter = function () {
          self.filterText = "";
          self.activeKnowledgeItem = {};
        };

        /**
         * Get Members 
         */

        membersService.Get()
          .then(getMembersSuccess)
          .catch(errorCallback);


        function getMembersSuccess(members) {
          self.members = members;
          self.filteredMembers = members;
        }

        /**
         * Get Knowledge List
         */

        knowledgeService.Get()
          .then(getKnowledgeSuccess)
          .catch(errorCallback);

        self.filterKnowledge = filterKnowledge;

        function filterKnowledge(item) {
        //Set the active item
        self.activeKnowledgeItem = item;

        self.filteredMembers = self.members.filter(function(member) {
          var isMatch = false;
          var typeArr;
            for (var key in member) {
              typeArr = member[key];
              if (Array.isArray(typeArr)) {
                var valArr = typeArr.map(function (item) {
                  return item.toUpperCase();
                });

                var matches = valArr.filter(function(val) {
                  return val === item.value.toUpperCase();
                });

                if (matches.length) {
                  isMatch = true;
                }
              }
            }
            return isMatch;
        });
      }

        function getKnowledgeSuccess(knowledgeList) {
          self.knowledgeList = knowledgeList.sort(function (itemA, itemB) {
            return itemB.count - itemA.count;
          });
        }

        function errorCallback(errorMsg) {
          $log.error("Error: " + errorMsg);
        } 
        
      }]);
})(angular.module('developmentGuild'));