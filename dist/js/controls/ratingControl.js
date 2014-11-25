/**
 * Created by MCG on 2014.11.25..
 */
angular.module("MCGTech.Controls")
    .directive('ratings', ["$timeout", function ($timeout) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
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
                var elementMouseOver = function (event) {
                    element.children().removeClass("icon-star-2");
                    element.children().slice(0, $(event.target).index() + 1).addClass("icon-star-2");
                };
                var elementMouseLeave = function (event) {
                    element.children().removeClass("icon-star-2");
                };
                var elementClick = function (event) {
                    $scope.$apply(function () {
                        $scope.ratingChanged({
                            rating: ($(event.target).index() + 1)
                        });
                    });
                };
                element.children().mouseover(elementMouseOver);
                element.children().mouseleave(elementMouseLeave);
                element.children().click(elementClick);

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