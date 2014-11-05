angular.module('number-spinner', [])

.directive('numberSpinner', function () {
    return {
        restrict: 'A',
        templateUrl: 'src/template/number-spinner.html',
        replace: true,
        scope: {
            number: '=ngModel',
            changed: '&ngChange',
            max: '=',
            min: '=',
            exceededMax: '&'
        },
        link: function (scope) {
            if (!scope.max) {
                scope.max = 99999;
            }

            if (!scope.min) {
                scope.min = -99999;
            }

            function changeNumber(newValue) {
                scope.number = newValue;
                if (angular.isFunction(scope.changed)) {
                    scope.changed();
                }
            }

            function exceededMax(oldValue) {
                if (angular.isFunction(scope.exceededMax)) {
                    scope.exceededMax({
                        oldValue: oldValue
                    });
                }
            }

            scope.$watch('number', function (newValue, oldValue) {
                if (newValue) {
                    if (typeof newValue === 'string') {
                        newValue = parseInt(newValue.replace(/\D/g, ''), 10);
                    }

                    if (newValue <= scope.max && newValue >= scope.min) {
                        changeNumber(newValue);
                    } else {
                        exceededMax(oldValue);
                    }
                }
            });

            scope.increase = function () {
                if (scope.number <= scope.max) {
                    changeNumber(scope.number + 1);
                } else {
                    exceededMax(scope.number);
                }
            };

            scope.decrease = function () {
                if (scope.number - 1 >= scope.min) {
                    changeNumber(scope.number - 1);
                }
            };
        }
    };
});