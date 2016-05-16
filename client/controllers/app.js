var angular = angular; 



var pollApp = angular.module('pollApp', ['ngRoute']); 

    pollApp.config(['$routeProvider', 
    
        function($routeProvider) {
    
            $routeProvider.
    
                when('/home',  {
                    templateUrl: '../views/home.html', 
                    controller: 'HomeCtrl',
                    controllerAs: 'home', 
                    access: {restricted: false}

                }).
                when('/login', {
                    templateUrl:'../views/user.html', 
                    controller: 'UserCtrl', 
                    controllerAs: 'user', 
                    access: {restricted: false}

                }).
                when('/logout', {
                    templateUrl:'../views/logout.html', 
                    controller: 'LogOutCtrl',
                    controllerAs: 'logout', 
                    access: {restricted: true}
                }).
                when('/recent', {
                    templateUrl: '../views/recent.html',
                    controller: 'RecentCtrl',
                    controllerAs: 'recent',
                    access: {restricted: false}

                }).
                when('/vote/:pollId', {
                    templateUrl: '../views/vote.html', 
                    controller: 'VoteCtrl', 
                    controllerAs: 'vote',
                    access: {restricted: false}

                }).
                when('/manage', {
                    templateUrl: '../views/manage.html', 
                    controller: 'ManageCtrl', 
                    controllerAs: 'mng',
                    access: {restricted: true}
                }).
                when('/results/:pollId', {
                    templateUrl: '../views/results.html', 
                    controller: 'ResultsCtrl', 
                    controllerAs: 'result',
                    access: {restricted: false}

                }).
                when('/create', {
                    templateUrl: '../views/create.html', 
                    controller: 'CreatePollCtrl', 
                    controllerAs: 'create',
                    access: {restricted: true}
                }).
                when('/edit/:pollId', {
                    templateUrl: '../views/editPoll.html', 
                    controller: 'EditPollCtrl', 
                    controllerAs: 'edit', 
                    access: {restricted: true}
                }). 
                otherwise({
                    redirectTo: '/home'
                }); 
            }
        ]); 
    

    pollApp.run(function ($rootScope, $location, $route, AuthService) {
         $rootScope.$on('$routeChangeStart',
            function (event, next, current) {
            if (!AuthService.isLoggedIn() && next.access.restricted) {
            AuthService.getUserStatusFromServer(function() {
                if (next.access.restricted && AuthService.isLoggedIn() === false) {
                    $location.path('/login');
                }
            }, function() { console.log("unable to complete auth request.")}); 
        
            }            
        });
    
    }); 