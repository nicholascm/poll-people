var LocalStrategy = require('passport-local').Strategy; 

var User = require('../models/users'); 

module.exports = function(passport) {
    
    passport.serializeUser(function(user, done) {
        done(null, user.id); 
    }); 
    
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user); 
        }); 
    }); 
    
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email', 
        passwordField: 'password', 
        passReqToCallback: true
    }, 
        function (req, email, password, done) {
            
            process.nextTick(function() {
        
            User.findOne({'local.email': email}, function(err, user) {
                if (err) {
                    console.log(err+"err"); 
                    return done(err, false, {message: "thas an issue"}); 
                }
                if (user) {
                    console.log(user+"user"); 
                    return done(null, false, {message: "Sorry, a user already exists with that name."});  
                } else {
                    var newUser = User(); 
                    newUser.local.email = email; 
                    newUser.local.password = newUser.generateHash(password); 
                    newUser.save(function(err) {
                        if (err) {
                            throw err; 
                        }
                        else {
                            return done(null, newUser, {message: "Sweet, you are now registered!"}); 
                        }
                    }); 
                }
        });   
            
            
            
        }); 
        
    })); 

    passport.use('local-login', new LocalStrategy({
        usernameField: 'email', 
        passwordField: 'password', 
        passReqToCallback: true}, 
        
        function(req, email, password, done) {
        
        console.log(email); 
        
        User.findOne({'local.email': email}, function(err, user) {
            
            if (err) {
                return done(err); 
            }
            
            if (!user) {
                return done(null, false, {'message': 'This isnt a correct username'}); 
                
            }
            if (!user.validPassword(password)) {
                return done(null, false, {'message': 'Wrong password bud'}); 
            }
            
                return done (null, user); 
            
        }); 
    })); 
}


