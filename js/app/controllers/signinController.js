
spaApp.controller("signinController", function($scope, $http, $location, userService){
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

