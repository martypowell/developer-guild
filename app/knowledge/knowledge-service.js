(function (app) {
  'use strict';

  app.factory('knowledgeService', ['$q', '$http', knowledgeService]);


  function knowledgeService($q, $http) {
    return {
      Get: get
    };

    function get() {
      return $http.get('/data/guild-members.json', {
        transformResponse: transformMembersIntoKnowledge
      })
        .then(sendKnowledgeResponseData)
        .catch(sendKnowledgeServiceError);
    }

    function transformMembersIntoKnowledge(response) {
      var members = angular.fromJson(response);
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
      return knowledgeList;
    }

    function sendKnowledgeResponseData(response) {
      return response.data;
    }

    function sendKnowledgeServiceError(response) {
      return $q.reject('Error: ' + response.status);
    }
  }

})(angular.module('developmentGuild'));