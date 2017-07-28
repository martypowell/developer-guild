(function (app) {
  'use strict';

  angular.module('developmentGuild.members', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/members', {
        templateUrl: 'members/members.html',
        controller: 'MembersCtrl'
      });
    }])

    .factory('membersService', ['$http', membersService])

    .controller('MembersCtrl', ['$scope', 'membersService', function ($scope, membersService) {
      var self = this;
      self.members = [];
      membersService.Get().then(function (members) {
        self.members = self.members.concat(members);
        $scope.$digest();
      });
    }]);

  function membersService($http) {
    function get() {
      return new Promise(function (resolve, reject) {
        $http({
          method: 'GET',
          url: '/data/guild-members.json'
        }).then(function successCallback(response) {
          var members = [];
          if (response && response) {
            response.data.forEach(function (member) {
              members.push({
                name: member.name,
                about: member.about || ""
              });
            });
          }
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