/**
 * Created by MCG on 2014.11.25..
 */
angular.module("MCGTech.Controls")
    .directive('ratings', ["$timeout", function ($timeout) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                readonly: "=",
                value: "=",
                ratingChanged: "&"
            },
            template: '<div>' +
            '<span class="icon-star icon-s"></span>' +
            '<span class="icon-star icon-s"></span>' +
            '<span class="icon-star icon-s"></span>' +
            '<span class="icon-star icon-s"></span>' +
            '<span class="icon-star icon-s"></span>' +
            '</div>',
            link: function ($scope, element, attrs) {

                $scope.$watch("value", function (newValue) {
                    setValue(Math.ceil(newValue));
                });

                function setValue(value) {
                    element.children().removeClass("icon-star-2");
                    element.children().slice(0, value).addClass("icon-star-2");
                }

                var elementMouseOver = function (event) {
                    setValue($(event.target).index() + 1);
                };
                var elementMouseLeave = function (event) {
                    setValue(0);
                };
                var elementClick = function (event) {
                    setValue($(event.target).index() + 1);
                    $scope.$apply(function () {
                        $scope.ratingChanged({
                            rating: ($(event.target).index() + 1)
                        });
                    });
                };
                if(!$scope.readonly) {
                    element.children().mouseover(elementMouseOver);
                    element.children().mouseleave(elementMouseLeave);
                    element.children().click(elementClick);
                }

                //
                //Disposing
                $scope.$on('$destroy', function () {
                    element.unbind('mouseover', elementMouseOver);
                    element.unbind('mouseleave', elementMouseLeave);
                    element.unbind('click', elementClick);
                });
            }
        };
    }]);