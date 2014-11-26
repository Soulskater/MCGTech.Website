/**
 * Created by MCG on 2014.11.26..
 */
angular.module("MCGTech")
    .controller("ActivityChart", ["$scope", "navigationService", "blogService", function ($scope, $navigation, $apiService) {
        $scope.init = function (blogPost) {
            $scope.blogPost = blogPost;
        };

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
                        color: "#673AB7"
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
                data: [{
                    name: 'Nov 14',
                    y: 3
                }, {
                    name: 'Nov 23',
                    y: 5
                }]
            }],
            xAxis: {
                title: {
                    enabled: false
                },
                labels: {
                    style: {
                        color: '#fff'
                    }
                },
                categories: ["Nov 14", "Nov 23"]
            },
            yAxis: {
                title: {
                    enabled: false
                },
                gridLineWidth: 0,
                labels: {
                    enabled: false,
                    style: {
                        color: '#fff'
                    }
                }
            },
            title: {
                text: null
            },
            loading: false
        };
    }]);