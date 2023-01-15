const mongoose = require('mongoose');

const mobileModel = new mongoose.Schema ({
    name : {type : String},
    model : {type : String},
    varient : {type : String},
    desc : {type : String},
    price : {type : Number},
    review : {type : Number},
    img : {type : String},
    available : {type : Boolean, default : true},
}, {timestamps : true}
)

module.exports = mongoose.model('Mobile', mobileModel)