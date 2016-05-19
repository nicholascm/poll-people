

pollApp.controller('HomeCtrl', function(PollFactory) {
    
    this.sample="hey"; 
    
    this.polls=PollFactory.getPolls(); 
    

}); 

pollApp.controller('RecentCtrl', function(PollFactory) {
    
    var self = this; 
    
    self.polls; 
    
    this.success = function(response) {

        self.polls = response.data; 
        console.log(response.data);
    }

    this.failure = function() {
        alert('failure'); 
    }
    
    PollFactory.getPolls(this.success, this.failure);  

    
}); 


pollApp.controller('VoteCtrl', ['$routeParams', 'PollFactory', 'AuthService',  function($routeParams, PollFactory, AuthService) {
    
    var self = this; 
    
    self.success = false; 

    self.identity = $routeParams.pollId; 
    
    self.choice;
    
    self.poll; 
    
    self.newCustomOption; //used to hold the new custom option if one is allowed
    
    self.allowCustom; 
    
    self.options; 
    
    self.customAdded = false; 
    
    self.showCustomOptionAvailable = function() {
        if (AuthService.isLoggedIn()  && self.allowCustom && !self.customAdded) {
            return true; 
        } else {
            return false; 
        }
    }; 
    
    self.addCustomOption = function() {
        if (self.newCustomOption.length > 0) {
            self.customAdded = true; 
            self.options.push(self.newCustomOption); 
        }
    }; 
    
    self.getPollSuccess = function(response) { 
        console.log(response.data); 
        self.poll = response.data; 
        self.options = response.data.options; 
        self.allowCustom = response.data.allowCustom; 
    };
    
    self.getPollFailure = function() {
        console.log('error getting poll'); 
    };


    self.saveSuccess = function(response) {
        self.success = true; 
        console.log("saved successfully"); 
    };
    
    self.saveFailure = function(response) {
        console.log("error saving"); 
    };
    
    self.save = function() {
       if (self.choice != null) {
            PollFactory.saveVote(
            {   
                pollId: self.poll._id, //pollId will not be saved for the vote, but is used to find the correct poll to update
                username: "",
                choice: self.choice
            }, 
                self.saveSuccess, 
                self.saveFailure
            ); 
    
           if (self.customAdded) {
                PollFactory.updatePollById({
                    id: self.poll._id, 
                    allowCustom: self.poll.allowCustom,
                    question: self.poll.question,
                    options: self.options
                }, self.saveSuccess, self.saveFailure); 
           }
        }
    };
         //load the original data
        PollFactory.getPollById(
        {
            id: $routeParams.pollId
        }, self.getPollSuccess, self.getPollFailure); 
   
}]);



pollApp.controller('ManageCtrl', ['AuthService', 'PollFactory',  function(AuthService, PollFactory) {

    var self = this; 
    
    self.user = AuthService.getUser(); 

    
    //go get all MY polls
    self.polls;
    
    self.success = function(res) {
        self.polls = res.data; 
        console.log(res.data); 
    }
    self.failure = function(res) {
        console.log("failed to retrieve my polls"); 
    }
    
    PollFactory.getPollsByUser(self.user._id, self.success, self.failure); 
    
    
    
    
    
    
    
}]);

pollApp.controller('CreatePollCtrl', ['AuthService', 'PollFactory', '$location', function(AuthService, PollFactory, $location) {
    
    var self = this; 
    
    self.allowCustom = false; 
    
    this.proposedQuestion = ""; 
    this.proposedOption = ""; 
    this.options = []; 

    this.addOption = function() {
        if(this.proposedOption.length > 0 && this.options.indexOf(this.proposedOption) < 0) {
            this.options.push(this.proposedOption); 
            this.proposedOption = "";  
        }

    }
    
    this.removeOption = function(option) {
        this.options.splice(this.options.indexOf(option), 1); 
    }
    
    
    this.success = function() {
        $location.path('/manage'); 
    }
    
    this.failure = function() {
        alert ("Sorry! We failed to save the poll for some reason!"); 
    }
    console.log(AuthService); 
    
    this.savePoll = function() {
        
        var userId = AuthService.getUser()._id; 
        var userName = AuthService.getUser().local.email; 
        console.log(userId); 
        if (this.proposedQuestion.length > 0 && this.options.length >= 1) {
            PollFactory.savePoll
            (
                {   
                    userName: userName, 
                    allowCustom: self.allowCustom, 
                    question: this.proposedQuestion, 
                    options: this.options, 
                    authorId: userId,
                    votes: []
                }, this.success, this.failure); 
            this.proposedQuestion = ""; 
            this.options = []; 
        } else {
            return; 
        }
    }

}]);

pollApp.controller('ResultsCtrl', ['$routeParams', 'Aggregate', 'PollFactory', function($routeParams, Aggregate, PollFactory) {
    
    var self = this; 

    this.poll = Aggregate.flattenResultsToArray({
            id: $routeParams.pollId
        });
    
    this.results = this.poll.votes; 
    
    this.id = $routeParams.pollId; 
    
    self.question;  
    
    var getPoll = function() {
        PollFactory.getPollById({
            id: $routeParams.pollId
        }, function(response) { self.question = response.data.question; })
    }
    
    getPoll(); 
    
    //TODO: Restructure the way these calls are made to utilize only a single http request. 
    //TODO: move the service to be used in the control 
}]);

pollApp.controller('UserCtrl', ['$http', 'AuthService', '$location', function($http, AuthService, $location) {
    
    var self = this; 
    
    this.newUser = true; 
    
    self.proposedUsername; 
    
    self.proposedPassword; 
    
    self.responseMessage; 
    
    self.success = function(response) {
        self.responseMessage = response.data.message; 
        if(response.data.success) {
            $location.path('/manage');
        }

    }
    
    self.failure = function(err) {
        self.responseMessage = err.data.message; 
    }
    
    this.login = function() {
       AuthService.login( {
                email: self.proposedUsername, 
                password: self.proposedPassword
            }, self.success,  self.failure); 
    }
    
    self.registerSuccess = function(response) {
        self.responseMessage = response.data.message; 

    }
    
    this.register = function() {
       AuthService.register( {
                email: self.proposedUsername, 
                password: self.proposedPassword
            }, self.registerSuccess,  self.failure); 
    }

    
    
}]); 


pollApp.controller('LogOutCtrl', ['AuthService', '$location', function(AuthService, $location) {
    
    var self = this; 
    
    self.success = function() {
        $location.path('/home')
    }
    self.failure = function() {
        console.log("failure to log out"); 
    }

    self.logout = function() {
        AuthService.logout(self.success, self.failure); 
    }


}]);


pollApp.controller('EditPollCtrl', ['PollFactory', '$routeParams', '$location',  function(PollFactory, $routeParams, $location) {
    
    var self = this; 
    
    self.poll; 
    
    self.question; 
    
    self.newOption; 
    
    self.options; 
    
    self.message; 
    
    self.allowCustom; 
    
    self.success = function(res) {
        console.log(res.data); 
        self.poll = res.data; 
        self.question = res.data.question;
        self.options = res.data.options; 
        self.allowCustom = res.data.allowCustom; 
    }
    
    self.failure = function(res) {
        console.log('failed to get poll'); 
    }
    
    self.removeOption = function(option) {
        self.options.splice(self.options.indexOf(option), 1); 
    }
    
    self.successUpdate = function(res) {
        self.message = "Successfully updated your poll"; 
        PollFactory.getPollById({
            id: $routeParams.pollId
        }, self.success, self.failure); 
    }
    
    self.savePoll = function() {
        PollFactory.updatePollById({
            id: $routeParams.pollId, 
            options: self.options, 
            question: self.question,
            allowCustom: self.allowCustom
        }, self.successUpdate, self.failure); 
    }
    
    self.addOption = function(newOption) {
        if(self.newOption.length > 0 && self.options.indexOf(self.newOption) < 0) {
            self.options.push(self.newOption); 
            self.newOption = "";  
        }    
        
    }; 
    
    self.successDelete = function() {
        $location.path('/manage');
    }
    
    self.deletePoll = function() {
        PollFactory.deletePollById({
            id: $routeParams.pollId, 
        }, self.successDelete, self.failure);  
    }
    
    PollFactory.getPollById({
            id: $routeParams.pollId
    }, self.success, self.failure); 
    
    
}]); 

