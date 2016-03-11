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
