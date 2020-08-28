(function() {
    'use strict';
    angular.module('public')
        .controller('MyInfoController', MyInfoController);
    MyInfoController.$inject = ['UserService'];

    function MyInfoController(UserService) {
        var myInfoCtrl = this;
        myInfoCtrl.myInfo = UserService.getUserData();
        if (myInfoCtrl.myInfo.length > 0) {
            UserService.getUserFavMenu(myInfoCtrl.myInfo[0].favMenu)
                .then(function(response) {
                    myInfoCtrl.menuItem = response;
                });
        }
    }
})();
