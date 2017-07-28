'use strict';

angular.module('developmentGuild.version', [
  'developmentGuild.version.interpolate-filter',
  'developmentGuild.version.version-directive'
])

.value('version', '0.1');
