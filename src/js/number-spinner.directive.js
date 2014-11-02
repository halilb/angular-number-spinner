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
                if (value > scope.max) {
                    scope.bindModel = scope.max;
                } else if (value < scope.min) {
                    scope.bindModel = scope.min;
                }
            });
        }
    };
});