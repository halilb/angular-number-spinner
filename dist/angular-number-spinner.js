/*! angular-number-spinner - v0.1.3 - 2014-11-05 
Source Code: https://github.com/halilb/angular-number-spinner */ 

angular.module('number-spinner', ['number-spinner-template'])

.constant('State', {
    OVER: 'over',
    BELOW: 'below',
    NORMAL: 'normal'
})

.directive('numberSpinner', ['State',
    function (State) {
        return {
            restrict: 'A',
            templateUrl: 'template/number-spinner.html',
            replace: true,
            scope: {
                number: '=ngModel',
                changed: '&ngChange',
                max: '=',
                min: '=',
                stateChanged: '&'
            },
            link: function (scope) {
                var doNotTriggerWatch = false;

                function changeNumber(newValue) {
                    scope.number = newValue;
                    if (angular.isFunction(scope.changed)) {
                        scope.changed();
                    }
                }

                function updateState(_state, oldValue) {
                    changeNumber(oldValue);

                    doNotTriggerWatch = _state !== State.NORMAL;

                    if (angular.isFunction(scope.stateChanged)) {
                        scope.stateChanged({
                            state: _state,
                            oldValue: oldValue
                        });
                    }
                }

                scope.$watch('number', function (newValue, oldValue) {
                    if (!doNotTriggerWatch && newValue) {
                        if (typeof newValue === 'string') {
                            newValue = parseInt(newValue.replace(/\D/g, ''), 10);
                        }

                        if (newValue <= scope.max && newValue >= scope.min) {
                            updateState(State.NORMAL, newValue);
                        } else if (newValue > scope.max) {
                            updateState(State.OVER, oldValue);
                        } else {
                            updateState(State.BELOW, oldValue);
                        }
                    }
                });

                scope.increase = function () {
                    if (scope.number < scope.max) {
                        updateState(State.NORMAL, scope.number + 1);
                    } else {
                        updateState(State.OVER, scope.number);
                    }
                };

                scope.decrease = function () {
                    if (scope.number > scope.min) {
                        updateState(State.NORMAL, scope.number - 1);
                    } else {
                        updateState(State.BELOW, scope.number);
                    }
                };
            }
        };
    }
]);
angular.module('number-spinner-template', ['template/number-spinner.html']);

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
