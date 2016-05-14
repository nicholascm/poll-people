var mongoose = require('mongoose'); 

var bcrypt = require('bcrypt-nodejs'); 

var passportLocalMongoose = require('passport-local-mongoose'); 

var Schema = mongoose.Schema; 

var UserSchema = new Schema({
    local: {
        email: String, 
        password: String, 
        firstname: String, 
        lastname: String
    }, google: {
        id: String, 
        token: String, 
        email: String, 
        name: String
    }

}); 

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password); 
}

var User = mongoose.model('User', UserSchema); 

module.exports = User; 