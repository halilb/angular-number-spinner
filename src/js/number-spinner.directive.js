angular.module('number-spinner', [])

.directive('numberSpinner', function () {
    return {
        restrict: 'A',
        templateUrl: 'src/template/number-spinner.html',
        replace: true,
        scope: {
            bindModel: '=ngModel',
            max: '=',
            min: '='
        },
        link: function (scope) {
            scope.$watch('bindModel', function (value) {
                if (value && isNaN(value)) {
                    value = parseInt(value.replace(/\D/g, ''), 10);
                }

                if (value > scope.max) {
                    value = scope.max;
                } else if (value < scope.min) {
                    value = scope.min;
                }

                scope.bindModel = value;
            });
        }
    };
});