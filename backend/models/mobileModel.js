const mongoose = require('mongoose');

const mobileModel = new mongoose.Schema ({
    name : {type : String},
    model : {type : String},
    desc : {type : String},
    price : {type : Number},
    review : {type : String},
    img : {type : String},
    available : {type : String, default : false},
}, {timestamps : true}
)

module.exports = mongoose.model('Mobile', mobileModel)