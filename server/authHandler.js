var User = require('../models/users.js'); 
var passport = require('passport'); 

function AuthHandler() {
    
    this.registerNewUser = function(req, res) {
        console.log(req.body); 
        passport.authenticate('local-signup', function(err, user, info) {
            if (err) {
                res.send('error'); 
                console.log(err); 
            }
            if (!user) {
                res.send('no response'); 
                console.log("registration failure"); 
            }
            else {
                res.send('success'); 
                console.log('success', user); 
            }
        })
        
    /*    
        User.register(new User({username: req.body.username}), req.body.password, function(err) {
            if (err) {
                res.status(500).json(err);            }
            else {
                console.log('registered successfully'); 
                res.json({
                    message: "You've registered successfully!"
                }); 
            }
        }); 
    */
    }
    
    this.loginUser = function(req, res) {
        
        
    }
}

module.exports = AuthHandler; 