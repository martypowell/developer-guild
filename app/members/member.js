(function(app) {
  app.controller('MemberCtrl', ['$scope', '$routeParams', '$log', 'membersService', MemberCtrl]);

  function MemberCtrl($scope, $routeParams, $log, membersService) {
    var viewModel = this;

    var name = $routeParams.name;

    membersService.GetByName(name)
      .then(memberSuccessResponse)
      .catch(handleError);
      
    function memberSuccessResponse(member) {
      viewModel.member = member;
    }

    function handleError(errorMsg) {
      $log.error('Error: ' + errorMsg);
    }
  }

})(angular.module('developmentGuild'));