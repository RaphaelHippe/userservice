angular.module('userModule')
  .provider('User', function(){
    this.$get = ["$resource", function ($resource) {
      var url = 'http://api.competeleague.com/user/:id';
      return $resource(url,
                        {id: '@_id'},
                        {
                          register: {
                            method: 'POST',
                            url: 'http://api.competeleague.com/user/register',
                            data: {display: '@_display', email: '@_email', password: '@_password', region: '@_region'}
                          }
                        }
                      );
    }];
});


// var username = 'admin@competeleague.com';
// var password = 'Password123';

                        // {get: {method: 'GET'},
                        // // headers: {'Basic' : btoa(username + ':' + password)}
                        // // headers: {'Authorization': 'Basic ' + btoa(username + ':' + password)}
                        // //  withCredentials: true
                        // }


                        // Authorization", "Basic " + btoa(username + ":" + password
