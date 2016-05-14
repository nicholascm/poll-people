pollApp.factory('Aggregate', ['PollFactory', function(PollFactory) {
    
    var aggregator = {}; 
    
    aggregator.flattenResultsToArray = function(pollIdObject) {
        
        var aggregateTotals = {
            votes: []
        }; 
        
        var flattenedPoll = function(response) {
            
            response.data.options.forEach(function(value) {
                aggregateTotals.votes.push(
                    {   
                        option: value, 
                        count: response.data.votes.filter(function(vote) {return vote.choice == value; }).length} 
                    );
                }); 
            
        }
        
        var errorHandle = function(response) {
            console.log("An error occurred grabbing the poll. Sorry!"); 
        }
        
        PollFactory.getPollById(pollIdObject, flattenedPoll, errorHandle);
        
        return aggregateTotals; 
    }; 
    
    
    
    return aggregator; 
    
}]); 