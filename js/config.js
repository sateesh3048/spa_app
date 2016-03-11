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
      controller: "signinController"
    })
    .state('WelcomePage', {
      url: "/WelcomePage",
      templateUrl: "WelcomePage.html",
      controller: "welcomeController"
    })
    .state('LogoutPage', {
      url: "/logout",
      templateUrl: "LogoutPage.html",
      controller: "signoutController"
    });
});
