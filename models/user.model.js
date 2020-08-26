const db = require('../config/db.config');
const {Schema} = require('mongoose');
const bcryptjs = require('bcryptjs');

const UserSchema = Schema({
    uname : {
        type : String,
        required : true,
        unique : true
    },
    pword : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        unique : true
    },
    recipes : [{
        type : Schema.Types.ObjectId,
        ref : "Recipe"
    }]
},{
    timestamps : true
});

UserSchema.pre('save',async function(next){
    const salt = await bcryptjs.genSalt();
    this.pword = await bcryptjs.hash(this.pword,salt);
    next();
});

module.exports = db.model("User",UserSchema);