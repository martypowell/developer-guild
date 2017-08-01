(function (app) {
  'use strict';

  angular.module('developmentGuild.members', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/members', {
        templateUrl: 'members/members.html',
        controller: 'MembersCtrl'
      });
    }])

    .factory('knowledgeService', ['$http', knowledgeService])

    .controller('MembersCtrl', ['$scope', '$window', 'membersService', 'knowledgeService', function ($scope, $window, membersService, knowledgeService) {
      var self = this;
      self.members = [];

      self.members = membersService.Get();
      self.filteredMembers = self.members;

      /* membersService.Get().then(function (members) {
        self.members = self.members.concat(members);
        
        $scope.$digest();
      }); */

      knowledgeService.Get().then(function (knowledgeList) {
        self.knowledgeList = knowledgeList.sort(function (itemA, itemB) {
          return itemB.count - itemA.count;
        });
        $scope.$digest();
      });

      self.filterKnowledge = filterKnowledge;
      self.knowledgeSelection = "";
      self.activeKnowledgeItem = "";

      self.clearFilter = function() { 
        self.filterText = "";
        self.activeKnowledgeItem = {};
      };

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
    }]);

  function knowledgeService($http) {
    function get() {
      return new Promise(function (resolve, reject) {
        $http({
          method: 'GET',
          url: '/data/guild-members.json',
          cache: true
        }).then(function successCallback(response) {
          var members = response.data || [];
          var knowledgeList = [];
          var typeArr;

          members.forEach(function (member) {
            for (var key in member) {
              typeArr = member[key];
              if (Array.isArray(typeArr)) {

                typeArr.forEach(function (type) {
                  let existingItem = knowledgeList.filter(function (item) {
                    return item.value === type;
                  });

                  if (existingItem.length) {
                    existingItem[0].count += 1;
                  } else {
                    knowledgeList.push({
                      type: key,
                      value: type,
                      count: 1
                    });
                  }
                });
              }
            }
          });

          resolve(knowledgeList);
        }, function (response) {
          console.error('something went wrong retreiving knowledge');
          reject(response);
        });
      });
    }

    return {
      Get: get
    };
  }
})(angular.module('developmentGuild'));