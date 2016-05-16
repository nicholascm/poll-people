
pollApp.directive('navigation', ['AuthService', function(AuthService) {
    

    return {
        templateUrl: '../views/nav.html', 
        link: function(scope, elem, attr) {
            
            scope.logOutTheLoggedInUser = function() {
                AuthService.logout(success, failure); 
            }
            
            var getUserName = function() {
                
                if (AuthService.getUser() == null) {
                    scope.userLoginButton = "Get Started!"; 
                    scope.navMenuOptions = [
                            { 
                                linkOption: "/#/login", 
                                linkOptionText: "Sign In",
                            },
                            {
                                linkOption: "/#/login", 
                                linkOptionText: "Register",
                            }
                        ]; 
                } else {
                    scope.userLoginButton = AuthService.getUser().local.email; 
                    scope.navMenuOptions = [
                            {
                                linkOption: "/#/manage", 
                                linkOptionText: "Profile",
                            }, 
                            { 
                                linkOption: "/#/login", 
                                linkOptionText: "Log Out",
                            }
                        ];
                }
            }; 
            var success = function() {
                console.log('success'); 
            }
            var failure = function() {
                console.log('failure'); 
            }
            

            
            getUserName(); 

        }
    }
    
}]); 