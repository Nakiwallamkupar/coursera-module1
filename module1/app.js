(function() {
	'use strict';
	angular.module('lunchCheck',[])
	.controller('LunchCheckController',LunchCheckController);

	LunchCheckController.$inject = ['$scope'];

	function LunchCheckController($scope) {
		$scope.dishList = "";
		$scope.message = "";
		$scope.helpMessage = "";

		function AlertStyle(color) {
			$scope.borderStyle = {
				'border-color' : color
			};
			$scope.messageStyle = {
				'color' : color
			};
		}

		$scope.checkIfToMuch = function() {
			var dishList = $scope.dishList;
			if(dishList.length > 0) {
				 var count = 0;
				 var dishArr = dishList.split(",");
				 var dishSizeArr = dishArr.length;
				for (var i = 0; i < dishSizeArr; i++) {
					if (dishArr[i].trim().length > 0) {
						count++;
					}
				}
				AlertStyle('green');
				$scope.message = count > 3 ? "Too much!" : "Enjoy!";
				$scope.helpMessage = count < dishSizeArr ? "I don't consider empty item!": "";
			}
			else{
				AlertStyle('red');
				$scope.message = "Please enter data first";
			}
		};
	}
})();