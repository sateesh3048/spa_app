'use strict';
/* Defining Angular App */
var spaApp = angular.module("spaApp", ['ui.router', 'LocalStorageModule']);


/* Defining configurations for App */
spaApp.config(function($stateProvider, $urlRouterProvider, localStorageServiceProvider){  
  localStorageServiceProvider.setPrefix('spaApp');
  localStorageServiceProvider.setStorageType('sessionStorage');
  // For any unmatched url, send to /index
  $urlRouterProvider.otherwise("/login");

  $stateProvider
    .state('login', {
      url: "/login",
      templateUrl: "login.html",
      controller: "SessionCtrl"
    })
    .state('WelcomePage', {
      url: "/WelcomePage",
      templateUrl: "WelcomePage.html",
      controller: "WelcomeCtrl"
    })
    .state('LogoutPage', {
      url: "/logout",
      templateUrl: "LogoutPage.html",
      controller: "SignOutCtrl"
    });
});

/* Defining Services for App */
spaApp.service('Page', function($rootScope){
  return {
    setTitle: function(title){
        $rootScope.title = title;
    }
  }
});

spaApp.service("storageService", function(localStorageService){
  var setData = function(user){
    localStorageService.set('name', user.name);
    localStorageService.set('color', user.color);
    localStorageService.set('font', user.font);
    localStorageService.set('title', user.title);
    localStorageService.set('email', user.email);
    localStorageService.set('token', user.token);
  }

  var getData = function(){
    return {
      name:  localStorageService.get('name'),
      font:  localStorageService.get('font'),
      color: localStorageService.get('color'),
      title: localStorageService.get('title'),
      email: localStorageService.get('email'),
      token: localStorageService.get('token')
    }
  }

  var clearData = function(){
    return localStorageService.remove('name', 'font', 'color', 'title', 'email', 'token');
  }
    return {
      setData: setData,
      getData: getData,
      clearData: clearData
    };
});

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

/* Defining Controllers for App */
spaApp.controller("SpaCtrl", function($scope, Page){
  Page.setTitle("Spa");
});

spaApp.controller("SessionCtrl", function($scope, $http, $location, userService){
  $scope.submit = function(form){
    if(form.$valid){
      $http({
        method: 'POST',
        url: 'http://localhost:3000/sessions',
        data: $scope.user
      }).then(function successCallback(response) {
          userService.setUser(response.data);
          $location.path('/WelcomePage');
        }, function errorCallback(err_response) {
          $scope.server_errors = err_response.data.errors;
      });
    }
  }
});

spaApp.controller("WelcomeCtrl", function($scope, $http, userService, Page, localStorageService){
  $scope.preference_form_success = false;
  $scope.user = userService.getUser();
  $scope.page_title = $scope.user.title;
  Page.setTitle($scope.user.title);
  
  $scope.$watch('user.title', function (val){
    Page.setTitle(val);
  });

  $scope.submitUserPreferences = function(){

    $http({
      method: 'PUT',
      url: 'http://localhost:3000/user_preferences/update',
      data: {email: $scope.user.email, token: $scope.user.token, user_preference: $scope.user}
    }).then(function successCallback(response) {
      userService.setUser(response.data);
      $scope.preference_form_success=true;
      $scope.preference_form_msg = "User preferences updated successfully"
      }, function errorCallback(err_response) {
      });
  }
});

spaApp.controller("SignOutCtrl", function($scope, storageService){
  storageService.clearData();
})
