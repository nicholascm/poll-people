pollApp.factory('AuthService', ['$http', function($http) {
    
    var auth = {}; 
    
    var user = null; 
    
    auth.getUser = function() {
        
        return user; 
    }; 
    
    auth.isLoggedIn = function() {
        if(user != null && user != false) {
            return true; 
        } else {
            return false; 
        }
    }; 
    
    auth.login = function(data, success, failure) {
        $http({
            method: "POST", 
            url: '/login',
            data: data
        }).then(function(res) {
            user = res.data.user; 
            console.log(res.data.user); 
            success(res);
        }, function(res) {
            user = false; 
            failure(res); 
        }); 
    };
    
    auth.register = function(data, success, failure) {
        $http({
            method: "POST", 
            url: '/register',
            data: data
        }).then(success, failure); 
    }; 
    
    auth.logout = function(success, failure) {
        $http({
            method: "POST", 
            url:'/logout', 
        }).then(function(data) {
            user = null; 
            success(data)
        }, failure);
    }; 
    
    auth.getUserStatusFromServer = function(success, failure) {
        $http({
            method: "GET", 
            url: '/user/status', 
        }).then(function(data) {
            if (data.status) {
                user = data.user; 
                success(data); 
            } else {
                user = false; 
            }
        }, function() {
            failure(); 
            console.log('failure to get user')
        }); 
    }; 

    return auth; 
    
}]); 