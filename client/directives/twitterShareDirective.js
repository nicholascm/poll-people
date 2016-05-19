
pollApp.directive('twitterShare', function() {
    
    return {   
        
        restrict: 'E',
        scope: true, 
        template: "<div id = 'theContainer'></div>", 
        link: function(scope, element, attrs) {
            
            scope.$watch(function(scope) { return scope.result.question; }, function(question) { 
                
                if (question) {
                   twttr.widgets.createShareButton(
                    'https://upollster.herokuapp.com/#/results/'+scope.result.id, element[0],
                    {
                        text: "Check out my poll results for "+"'"+scope.result.question+"'"
    
                    }).then(function() {console.log("done")});
                 }
        }
        
    
        )}
    
    }
});
