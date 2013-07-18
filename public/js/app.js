angular.module('contacts', ['contacts.filters', 'ui.bootstrap']).
  config(['$routeProvider', '$locationProvider', '$compileProvider', function($routeProvider, $locationProvider, $compileProvider) {
    $routeProvider.
      when('/', {
        templateUrl: '/p/list',
        controller: ListCtrl,
      }).
      otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
    $compileProvider.urlSanitizationWhitelist(/^\s*(https|skype|mailto):/);
  }]);