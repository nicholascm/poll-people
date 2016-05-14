
pollApp.directive('bars', function() {
    
    return {
        
         restrict: 'E',
         replace: true,
         template: '<div id="chart"></div>',
         scope: true,
         link: function (scope, element, attrs) {
             
                scope.$watch(function(scope) {return scope.result.results; }, function(data) {
                
                if (data.length>0) {
                    
                var margin = {top: 20, right: 20, bottom: 30, left: 40},
                    width = 960 - margin.left - margin.right,
                    height = 500 - margin.top - margin.bottom;
                    
                        
                    var x = d3.scale.ordinal()
                        .rangeRoundBands([0,width], .1); 
                    
                    var y = d3.scale.linear()
                        .range([height, 0]); 
                    
                    var xAxis = d3.svg.axis()
                        .scale(x)
                        .orient("bottom"); 
                    
                    var yAxis = d3.svg.axis()
                        .scale(y)
                        .orient("left")
                        .ticks(10); 
                    
                    var svg = d3.select("#chart").append("svg")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                        .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")"); 
                    
                    x.domain(data.map(function(d) { return d.option; })); 
                    y.domain([0, d3.max(data, function(d) { return d.count; })]); 
                    
                    svg.append("g")
                        .attr("class", "x axis")
                        .attr("transform", "translate(0,"+ height + ")")
                        .call(xAxis); 
                        
                    svg.append("g")
                        .attr("class", "y axis")
                        .call(yAxis)
                        .append("text")
                        .attr("transform", "rotate(-90)")
                        .attr("y", 6)
                        .attr("dy", ".71em")
                        .style("text-anchor", "end")
                        .text("Votes"); 
                        
                    svg.selectAll(".bar") 
                        .data(data)
                        .enter().append("rect")
                        .attr("class", "bar")
                        .attr("x", function(d) { return x(d.option); })
                        .attr("width", x.rangeBand())
                        .attr("y", function(d) { return y(d.count); })
                        .attr("height", function(d)  { return height - y(d.count); }); 
                        
                        
                        
                        
                        
                    /*
                    
                    var w = 500; 
                    var barHeight = 20;
                    
                    var x = d3.scale.linear()
                        .domain([0, d3.max(newValue, function(d) { return d.count; })])
                        .range([0, w]); 
                       
                    var chart = d3.select('#chart')
                        .append("svg")
                        .attr("width", w)
                        .attr("height", barHeight * newValue.length);                     
                        
                    var bar = chart.selectAll("g")
                        .data(newValue)
                        .enter().append("g")
                        .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });                
                        
                    bar.append("rect")
                        .attr("width", function(d) { return x(d.count); })
                        .attr("height", barHeight - 1);
                    
                    bar.append("text")
                        .attr("x", function(d) { return x(d.count) -3; })
                        .attr("y", barHeight / 2)
                        .attr("dy", ".35em")
                        .text(function(d) { return d.option+": "+d.count; });
                        */
                     
                }
                    
                }, true); 
            } 
        }
    }); 
    
    