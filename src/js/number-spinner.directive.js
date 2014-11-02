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