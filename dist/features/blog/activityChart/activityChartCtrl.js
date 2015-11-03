/**
 * Created by MCG on 2014.11.26..
 */
angular.module("MCGTech")
    .controller("ActivityChart", ["$scope", "navigationService", "blogService", function ($scope, $navigation, $apiService) {
        $scope.init = function (blogPost) {
            $scope.blogPost = blogPost;

            linq(blogPost.comments).groupBy(function (comment) {
                return [moment(comment.created).format('MMM')];
            }).forEach(function (commentGroup) {
                if(commentGroup.length > 0) {
                    $scope.hasData = true;
                }
                if ($scope.chartConfig.xAxis.categories.length < 3) {
                    var categoryName = moment(commentGroup[0].created).format('MMM');
                    $scope.chartConfig.xAxis.categories.push(categoryName);
                    $scope.chartConfig.series[0].data.push({
                        name: categoryName,
                        y: commentGroup.length
                    });
                }
            });
        };

        $scope.hasData = false;

        $scope.chartConfig = {
            options: {
                chart: {
                    type: 'column',
                    backgroundColor: "transparent",
                    spacing: [5, 5, 5, 5]
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        color: "#651FFF"
                    },
                    column: {
                        borderWidth: 0
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">Comments: </td>' +
                    '<td style="padding:0"><b>{point.y}</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                }
            },
            series: [{
                data: []
            }],
            xAxis: {
                title: {
                    enabled: false
                },
                labels: {
                    style: {
                        color: 'rgba(255, 255, 255, 0.5)'
                    }
                },
                categories: []
            },
            yAxis: {
                title: {
                    enabled: false
                },
                gridLineWidth: 0,
                labels: {
                    enabled: false,
                    style: {
                        color: 'rgba(255, 255, 255, 0.5)'
                    }
                }
            },
            title: {
                text: null
            },
            loading: false
        };
    }]);