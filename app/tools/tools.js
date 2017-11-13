(function(app) {
  app.controller('ToolsCtrl', ['$log', 'toolsService', ToolsCtrl]);

  function ToolsCtrl($log, toolsService) {
    var viewModel = this;

    toolsService.Get()
      .then(toolsSuccessResponse)
      .catch(handleError);

      function toolsSuccessResponse(tools) {
        viewModel.tools = tools;
      }

      function handleError(errorMsg) {
        $log.error('Error: ' + errorMsg);
      }
  }

})(angular.module('developmentGuild'));