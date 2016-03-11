'use strict';
/* Defined user Service to fetch user details from api and to return user details */
spaApp.service('userService', function($http, storageService) {
  var currentUser = {};
  var preference = {}

  var setUser = function(userObj) {
    storageService.setData(userObj);
    currentUser = userObj;
  };

  var getUser = function(){
    if(isEmpty(currentUser)) {
      return storageService.getData();
    }else
      return currentUser;
  };

  var isEmpty = function(obj){
    return Object.keys(obj).length === 0;
  };

  return {
    setUser: setUser,
    getUser: getUser
  };

});