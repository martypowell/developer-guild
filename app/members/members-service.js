(function (app) {

    function membersService($http) {
        function get() {
            $http({
                method: 'GET',
                url: '/data/guild-members.json'
            }).then(function successCallback(response) {
                var members = [];
                members.forEach(function (member) {
                    members.push({
                        name: member.name,
                        about: about || ""
                    });
                });
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
                // this callback will be called asynchronously
                // when the response is available
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.error('something went wrong retreiving members');
                return [];
            });
        }

        return {
            Get: get
        };
    }

})(angular.module('developmentGuild'));