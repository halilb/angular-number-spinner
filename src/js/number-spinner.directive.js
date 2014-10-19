angular.module('number-spinner', [])

.directive('numberSpinner', function () {
    return {
        restrict: 'A',
        templateUrl: 'src/template/number-spinner.html',
        transclude: true,
        replace: true,
        scope: {
            max: '=',
            min: '='
        }
    };
});