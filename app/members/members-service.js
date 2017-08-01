(function (app) {
  'use strict';

  app.factory('membersService', ['$http', '$q', memberService]);

  function memberService($http, $q) {
    return {
      Get: get
    };

    function get() {
      return $http.get('/data/guild-members.json', {
        transformResponse: sortMemberData
      })
        .then(sendMemberResponseData)
        .catch(sendMemberServiceError);
    }

    function sortMemberData(response, headerGetter) {
      var members = angular.fromJson(response);
      return members.sort(function (a, b) {
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
    }

    function sendMemberResponseData(response) {
      return response.data;
    }

    function sendMemberServiceError(response) {
      return $q.reject('Error: ' + response.status);
    }

  }

})(angular.module('developmentGuild'));