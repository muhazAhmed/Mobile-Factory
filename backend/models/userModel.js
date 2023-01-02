const mongoose = require('mongoose');

const userModel = new mongoose.Schema ({
    username : {type : String},
    email : {type : String},
    phone : {type : Number},
    password : {type : String},
}, {timestamps : true}
)

module.exports = mongoose.model('User', userModel)