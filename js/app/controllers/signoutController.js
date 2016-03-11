spaApp.controller("signoutController", function($scope, storageService){
  storageService.clearData();
})