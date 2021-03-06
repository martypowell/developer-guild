(function (app) {
  'use strict';

  app.factory('membersService', ['$http', '$q', '$cacheFactory', memberService]);

  function memberService($http, $q, $cacheFactory) {
    return {
      Get: get,
      GetByName: getByName
    };

    function get() {
      /* var deferred = $.defer();
      var membersCache = $cacheFactory.get('membersCache');

      if (!membersCache) {
        membersCache = $cacheFactory('membersCache');
      }

      var membersFromCache = membersCache.get('all');

      if (membersFromCache) {
        //Load data from cache
      }
      else {
        //Load data from "server"
      } */

      //return $http.get('//bcgphp/developer-guild/data/guild-members.json', {
      return $http.get('../data/guild-members.json', {
        cache: true, //memeberCache object
        transformResponse: sortMemberData
      })
        .then(sendMemberResponseData)
        .catch(sendMemberServiceError);
    }

    array.forEach(function(element) {
      
    }, this);

    function deleteMembersResponseFromCache() {
      var httpCache = $cacheFactory('$http');
      httpCache.remove('../data/guild-members.json');
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

    function getByName(name) {
     var deferred = $q.defer();
     if (!name) {
       sendMemberServiceError('Error: name was not found');
     }

      return get().then(function(members) {
        var member = members.filter(function(member) {
          //TODO: Make this by Id
          return member.name.toLowerCase() === name.toLowerCase();
        });

        if (member.length && member.length === 1) {
          deferred.resolve(member[0]);
        }
        else {
          deferred.reject("No records found");
        }

        return deferred.promise;
      });
    }

  }

})(angular.module('developmentGuild'));