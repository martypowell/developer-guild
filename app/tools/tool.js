(function(app) {
  app.controller('ToolCtrl', ['$log', 'toolsService', ToolsCtrl]);

  function ToolsCtrl($log, toolsService) {
    var viewModel = this;

    toolsService.GetToolByName()
      .then(toolsSuccessResponse)
      .catch(handleError);

      function toolsSuccessResponse(tools) {
        viewModel.tool = tool;
      }

      function handleError(errorMsg) {
        $log.error('Error: ' + errorMsg);
      }
  }


})(angular.module('developmentGuild'));