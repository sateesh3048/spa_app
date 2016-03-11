spaApp.controller("welcomeController", function($scope, $http, userService, pageService, localStorageService){
  $scope.preference_form_success = false;
  $scope.user = userService.getUser();
  $scope.page_title = $scope.user.title;
  pageService.setTitle($scope.user.title);
  
  $scope.$watch('user.title', function (val){
    pageService.setTitle(val);
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