/*! number-spinner - v - 2014-11-03 */ 
angular.module('number-spinner', [])

.directive('numberSpinner', function () {
    return {
        restrict: 'A',
        templateUrl: 'src/template/number-spinner.html',
        replace: true,
        scope: {
            number: '=ngModel',
            max: '=',
            min: '='
        },
        link: function (scope) {
            scope.$watch('number', function (value) {
                if (value && isNaN(value)) {
                    value = parseInt(value.replace(/\D/g, ''), 10);
                }

                if (value > scope.max) {
                    value = scope.max;
                } else if (value < scope.min) {
                    value = scope.min;
                }

                scope.number = value;
            });

            scope.increase = function () {
                if (scope.number + 1 < scope.max) {
                    scope.number += 1;
                }
            };

            scope.decrease = function () {
                if (scope.number - 1 > scope.min) {
                    scope.number -= 1;
                }
            };
        }
    };
});
angular.module('templates-dist', ['template/number-spinner.html']);

angular.module("template/number-spinner.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/number-spinner.html",
    "<span class=\"ui-spinner ui-widget ui-widget-content ui-corner-all\">\n" +
    "  <input class=\"ui-spinner-input\" ng-model=\"number\">\n" +
    "  <a href ng-click=\"increase()\" class=\"ui-spinner-button ui-spinner-up ui-corner-tr ui-button ui-widget ui-state-default ui-button-text-only\" tabindex=\"-1\" role=\"button\">\n" +
    "    <span class=\"ui-button-text\">\n" +
    "      <span class=\"ui-icon ui-icon-triangle-1-n\">▲</span>\n" +
    "    </span>\n" +
    "  </a>\n" +
    "  <a ng-click=\"decrease()\" class=\"ui-spinner-button ui-spinner-down ui-corner-br ui-button ui-widget ui-state-default ui-button-text-only\" tabindex=\"-1\" role=\"button\">\n" +
    "    <span class=\"ui-button-text\">\n" +
    "      <span class=\"ui-icon ui-icon-triangle-1-s\">▼</span>\n" +
    "    </span>\n" +
    "  </a>\n" +
    "</span>");
}]);
