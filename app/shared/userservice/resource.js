angular.module('userModule')
  .provider('User', function(){
    this.$get = function ($resource) {
      var url = 'http://api.competeleague.com/user/:id';
      return $resource(url,
                        {id: '@_id'},
                        {
                          register: {
                            method: 'POST',
                            url: 'http://api.competeleague.com/user/register'
                          }
                        }
                      );
    };
});


// var username = 'admin@competeleague.com';
// var password = 'Password123';

                        // {get: {method: 'GET'},
                        // // headers: {'Basic' : btoa(username + ':' + password)}
                        // // headers: {'Authorization': 'Basic ' + btoa(username + ':' + password)}
                        // //  withCredentials: true
                        // }


                        // Authorization", "Basic " + btoa(username + ":" + password
