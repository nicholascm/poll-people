var mongoose = require('mongoose'); 

var Schema = mongoose.Schema; 

var pollSchema = new Schema({
    
    userName: String, 
    allowCustom: Boolean, 
    question: String, 
    options: [String], 
    authorId: String, 
    votes: [{
                userId: Number,
                username: String, 
                choice: String
            }]
}); 

var Poll = mongoose.model('Poll', pollSchema); 

module.exports = Poll; 