(function (app) {

  app.factory('toolsService', ['$http', '$q', 'membersService', toolsService]);

  function toolsService($http, $q, membersService) {
    return {
      Get: get
    };

    function get() {
      var deferred = $q.defer();
      var tools = [];

      return membersService.Get().then(function (members) {
        members.forEach(function (member) {
          if (member.tools && member.tools.length) {
            tools = tools.concat(member.tools);
          }
        });

        if (tools.length) {
          deferred.resolve(removeDuplicates(tools));
        }
        else {
          deferred.reject("Something went wrong retreiving tools");
        }

        return deferred.promise;
      });
    }

    function removeDuplicates(arr) {
      return arr.filter(function(value, index){ return arr.indexOf(value) == index });
    }

  }

})(angular.module('developmentGuild'));