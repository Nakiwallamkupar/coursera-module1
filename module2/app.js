(function () {
	'use strict';

	angular.module('ShoppingListCheckOff', [])
	.controller('ToBuyShoppingController', ToBuyShoppingController)
	.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
	.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

	ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
	function ToBuyShoppingController (ShoppingListCheckOffService) {
		var toBuy = this;
		toBuy.items = ShoppingListCheckOffService.getToBuyItems();
		toBuy.moveToBought = function (itemIndex) {
			ShoppingListCheckOffService.moveToBought(itemIndex);
		};
	}

	AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
	function AlreadyBoughtShoppingController (ShoppingListCheckOffService) {
		var bought = this;
		bought.items = ShoppingListCheckOffService.getBoughtItems();
	}

	function ShoppingListCheckOffService () {
		var service = this;

		var toBuyItems = [{
			name : "Cookies",
			quantity: "10 bags"
		},
		{
			name : "Milk",
			quantity:"5 bottles"
		},
		{
			name : "Donuts",
			quantity : "4 bags"
		},
		{
			name : "Chocolate",
			quantity : "10 bags"
		},
		{
			name : "Peanut Butter",
			quantity : "4 bottles"
		},
		{
			name : "Pepto Bismol",
			quantity : "2 bottles"
		},
		{
			name : "Pepto Bismol (Chocolate flavor)",
			quantity : "4 bottles"
		},
		{
			name : "Pepto Bismol (Cookie flavor)",
			quantity : "2 bottles"
		},
		{
			name : "Humberger",
			quantity : "3 bags"
		},
		{
			name : "Fruit juice",
			quantity : "6 bottles"
		}
		];

		var boughtItems = [];

		service.getToBuyItems = function () {
			return toBuyItems;
		};

		service.getBoughtItems = function () {
			return boughtItems;
		};

		service.moveToBought = function (itemIndex) {
			boughtItems.push(toBuyItems[itemIndex]);
			toBuyItems.splice(itemIndex,1);
		};
	}
})();