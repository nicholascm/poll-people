'use strict';


var PollHandler = require(process.cwd() + '/server/pollHandler.js'); 

var AuthHandler = require(process.cwd() + '/server/authHandler.js'); 

module.exports = function (app, passport) {
   
   var pollHandler = new PollHandler(); 
   var authHandler = new AuthHandler(); 

   app.route('/')
      .get(function (req, res) {
         res.sendFile(process.cwd() + '/public/index.html');
      });


   app.route('/login')
      .post(function(req, res, next) {
         console.log('post'); 
         passport.authenticate('local-login', function(err, user, info) {
            if (err) {
               return next (err); 
            }
            if(!user) {
               res.status(401).send({success: false, message: info.message}); 
            }
            else {

               req.login(user, function(err) {
                  
                  if (err) {
                     
                     res.send({success: false, message: "Unable to login"}); 
                  
                  } else {
                  
                     res.send({success: true, 
                     message: user.local.email+" has logged in successfully!", 
                     user: req.user
                     }); 
                  }
               }); 
            }
         
         })(req, req.body.email, req.body.password); 
      }); 
   
   
   app.route('/register')

   
      .post(function(req, res) {

         passport.authenticate('local-signup', function (err, newUser, info) { //this is the done function being passed into local
            if (err) {
               res.send('error'); 
            }
            if (!newUser) {
               res.send({success: false, message: info.message})
            }
            if (newUser) {
               console.log('new user'); 
               res.send({ success : true, message : info.message });
            } 
         }) (req, req.body.email, req.body.password); 
      
      }); 
      
   app.route('/logout')
      .post(function(req, res) {
         req.logout(); 
         res.send({success: true, message: "You have been successfully logged out."}); 
      })

   app.route('/api/polls')
      .get(pollHandler.getPolls)
      .post(isLoggedIn, pollHandler.savePoll); 
   
   app.route('/api/polls/user/:userId')
      .get(pollHandler.getPollsByUser); 

   app.route('/api/polls/vote')
      .post(pollHandler.saveVoteForPoll);
   
   app.route('/api/poll/:id')
      .get(pollHandler.getPollById)
      .post(pollHandler.updatePollById)
      .delete(pollHandler.deletePollById); 
      
   app.route('/user/status')
      .get(function(req, res) {
         if (req.isAuthenticated()) {
            res.status(200).json({
               status: true,
               user: req.user
            }); 
         } else {
            res.status(200).json({
               status: false
            })
         }
      }); 
};

function isLoggedIn(req, res, next) {
   if (req.isAuthenticated()) {
      return next(); 
   }
   else {
      res.status(500).send("Authentication is required to view this endpoint."); 
   }
}