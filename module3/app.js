(function () {
	'use strict';

	angular.module('NarrowItDownApp', [])
	.controller('NarrowItDownController', NarrowItDownController)
	.service('MenuSearchService', MenuSearchService)
	.directive('foundItems', FoundItems)
	.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

	function FoundItems(){
		var ddo = {
			templateUrl: 'foundItems.html',
			scope: {
				items: '<',
				onRemove: '&'
			},
			controller: FoundItemsDirectiveController,
			controllerAs: 'narrowItdown',
			bindToController: true
		};
		return ddo;
	}

	function FoundItemsDirectiveController() {
		var narrowItdown = this;

		narrowItdown.nothingFound = function () {
			if (narrowItdown.items !== undefined && narrowItdown.items.length === 0){
				return true;
			}
			return false;
		};
	}

	

	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController(MenuSearchService) {
		var narrowItdown = this;

		narrowItdown.searchMenuItem = function() {
			var promise = MenuSearchService.getMatchedMenuItems(narrowItdown.search);
			promise.then(function(result){
				narrowItdown.found  = result;
			}).catch(function(error){
				console.log(error.message);
			});

		};
		narrowItdown.removeItem = function(itemIndex) {
			narrowItdown.found.splice(itemIndex, 1);
		}
	}

	MenuSearchService.$inject = ['$http','ApiBasePath'];

	function MenuSearchService($http, ApiBasePath) {
		var service = this;

		service.getMatchedMenuItems = function(searchTerm){
			return $http({
				method: "GET",
				url: (ApiBasePath + "/menu_items.json")
			}).then(function (result){
				var foundItems = [];

				if (searchTerm !== undefined && searchTerm.length > 0) {
					searchTerm = searchTerm.toLowerCase();
					for (var i = 0; i < result.data.menu_items.length; i++) {
						var menu_item = result.data.menu_items[i];
						var description = menu_item.description.toLowerCase();
						if (description.indexOf(searchTerm) !== -1) {
							foundItems.push(menu_item);
						}
					}
				}
				return foundItems;
			},function error(response){
				throw new Error("Failure!");
			});
		};
	}
})();