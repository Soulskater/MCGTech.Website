/**
 * Created by MCG on 2014.10.24..
 */
angular.module("MCGTech")
    .controller("ProjectsCtrl", [ "$scope", function ($scope) {
        $scope.projects = [
            {name: "FlowDesigner", color: "#78818a"},
            {name: "DockPanel", color: "#83c954"},
            {name: "TankWar", color: "#ea8c6c"},
            {name: "SpaceInvaders", color: "#0eadd4"}
        ];
    }]);
