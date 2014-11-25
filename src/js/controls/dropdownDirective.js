/**
 * Created by MCG on 2014.10.25..
 */
angular.module("MCGTech.Controls", [])
    .directive('elementLeave', ["$timeout", function ($timeout) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                active: "=elementLeave"
            },
            link: function ($scope, element, attrs) {

                $scope.$watch("active", function (active) {
                    if (active) {
                        $timeout(function () {
                            $(document).click(domClickHandler);
                        }, 10);
                    }
                });

                var domClickHandler = function (event) {
                    $(document).unbind('click', domClickHandler);
                    if (event.target === element[0] || $(event.target).closest(element).length > 0)
                        return;
                    $scope.$apply(function () {
                        $scope.active = false;
                    });
                };
                var elementClickHandler = function ($event) {
                    $(document).click(domClickHandler);
                    //$event.stopPropagation();
                };
                element.click(elementClickHandler);

                //
                //Disposing
                $scope.$on('$destroy', function () {
                    $(document).unbind('click', domClickHandler);
                    element.unbind('click', elementClickHandler);
                });
            }
        };
    }]);