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

    .factory('membersService', ['$http', membersService])

    .controller('MembersCtrl', ['$scope', 'membersService', 'knowledgeService', function ($scope, membersService, knowledgeService) {
      var self = this;
      self.members = [];
      membersService.Get().then(function (members) {
        self.members = self.members.concat(members);
        $scope.$digest();
      });

      knowledgeService.Get().then(function(knowledgeList) {
        console.log('knowledgeList', knowledgeList);
      });
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
                  let existingItem = knowledgeList.filter(function(item) {
                    return item.value === type;
                  });

                  if (existingItem.length) {
                    existingItem[0].count += 1;
                  }
                  else {
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

  function membersService($http) {
    function get() {
      return new Promise(function (resolve, reject) {
        $http({
          method: 'GET',
          url: '/data/guild-members.json',
          cache: true
        }).then(function successCallback(response) {

          if (response && response) {
            var members = response.data || [];
            members = members.sort(function (a, b) {
              var nameA = a.name.toUpperCase(); // ignore upper and lowercase
              var nameB = b.name.toUpperCase(); // ignore upper and lowercase
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }

              // names must be equal
              return 0;
            });
            resolve(members);
          }
          reject(response);
          // this callback will be called asynchronously
          // when the response is available
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          console.error('something went wrong retreiving members');
          reject(response);
        });
      });
    }

    return {
      Get: get
    };
  }
})(angular.module('developmentGuild'));