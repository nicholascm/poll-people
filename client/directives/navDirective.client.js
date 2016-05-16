
pollApp.directive('navigation', ['AuthService', function(AuthService) {
    

    return {
        templateUrl: '../views/nav.html', 
        link: function(scope, elem, attr) {
            
            
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
                                linkOption: "/#/logout", 
                                linkOptionText: "Log Out",
                            }
                        ];
                }
            }; 

            
            getUserName(); 

        }
    }
    
}]); 