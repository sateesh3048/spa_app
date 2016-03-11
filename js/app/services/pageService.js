/* Defining Services for App */
spaApp.service('pageService', function($rootScope){
  return {
    setTitle: function(title){
        $rootScope.title = title;
    }
  }
});


