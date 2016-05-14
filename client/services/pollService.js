
pollApp.factory('PollFactory', ['$http', function($http) {
    
    var factory = {}; 
    
    factory.savePoll= function(aPollObject, success, failure) {
        console.log(aPollObject); 
        $http({
            method: "POST", 
            url: "/api/polls", 
            data: aPollObject
        }).then(success, failure); 
    }; 
    
    
    factory.getPolls = function(success, failure) {
         $http({
            method: "GET", 
            data: {id: "1"},
            url: "/api/polls"
        }).then(success, failure);
    };  
    
    
    factory.getPollById = function(pollIdObject, success, failure) {
        console.log(pollIdObject); 
        $http({
            method: "GET", 
            url: "/api/poll/"+pollIdObject.id,
            data: pollIdObject
        }).then(success, failure); 
        
    }; 
    

    factory.getPollsByUser = function(userId, success, failure) {
        $http({
            method: "GET", 
            url: "/api/polls/user/"+userId
        }).then(success, failure); 
    }
    
    factory.saveVote = function(voteObject, success, failure) {
        $http({
            method: "POST", 
            url: "/api/polls/vote",
            data: voteObject, 
        }).then(success, failure); 
    }; 
    
    
    factory.updatePollById = function(pollUpdates, success, failure) {
        $http({
            method: "POST", 
            url: "/api/poll/"+pollUpdates.id, 
            data: pollUpdates
        }).then(success, failure); 
    }; 
    
    factory.deletePollById = function(pollToDelete, success, failure) {
        $http({
            method: "DELETE", 
            url: "/api/poll/"+pollToDelete.id, 
        }).then(success, failure);  
    }
    
    return factory; 
}]); 