var Poll = require('../models/polls.js'); 


function pollHandler () {
    
    
   this.getPolls = function(req, res) {
       Poll.find({}, function (err, polls) {
           if (err) {
               console.log(err); 
           }
           else {
               res.send(polls); 
           }
    });
       
   }; 
   
   this.savePoll = function(req, res) {

       var poll = new Poll(req.body); 
          
        poll.save(function(err) {
            if (err) {
                console.log(err); 
            }
            else {
                res.send('success'); 
            }
        })
       
   };
   

   this.saveVoteForPoll = function (req, res) {
        
      var id = req.body.pollId; 
    
      Poll.findOne({_id: req.body.pollId}, function(err, poll) {
        
        if (err) {
            console.log(err); 
        }
        else {
            console.log(poll); 
            poll.votes.push({
                userId: req.body.userId, 
                name: req.body.name, 
                choice: req.body.choice 
            
            });  
            poll.save(function(err) {
                if (err) {
                    console.log(err); 
                }
                else {
                    res.send('success'); 

                }
            }); 
        }
      }); 
         
    }; 
    
   this.getPollById = function(req, res) {
        
     console.log(req.params.id); 
    
     Poll.findOne({_id: req.params.id}, function(err, doc) {
        if (err) {
            console.log(err); 
        }
        else {
            res.send(doc); 
        }
    });     
    
   };
   
   this.getPollsByUser = function (req, res) {
       Poll.find({authorId: req.params.userId}, function(err, polls) {
           if (err) {
               console.log(err); 
           }
           else {
               res.send(polls);
           }
       }); 
   }; 
   
   this.updatePollById = function (req, res) {
       console.log(req.body); 
       Poll.update({_id: req.params.id}, {options: req.body.options, question: req.body.question, allowCustom: req.body.allowCustom }, {}, function(err) {
           if (err) {
               console.log (err); 
           } else {
               res.status(200).send({status: "Successful update"}); 
           }
       }); 
   }; 
   
   this.deletePollById = function(req, res) {
       Poll.remove({_id: req.params.id}, function(err) {
           if (err) {
               console.log(err); 
               res.status(401).send({success: false, status: "Error deleting poll"}); 
           }
           else {
               res.status(200).send({success: true, status: "You deleted your poll!"}); 
           }
       }); 
   }; 

}

module.exports = pollHandler; 