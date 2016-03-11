'use strict';
/* Defined Page Service to set web page title for App */
spaApp.service('pageService', function($rootScope){
  return {
    setTitle: function(title){
        $rootScope.title = title;
    }
  }
});


