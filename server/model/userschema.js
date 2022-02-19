const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');



const userSchema = new mongoose.Schema({
    id:{
        type: "Number",
        required: true
    },
    username: {
        type: 'string',
        required: true
    },
    email: {
        type: 'string',
        required: true
    },
    password: {
        type: 'string',
        required: true
    }
})
// console.log(userSchema)

userSchema.pre('save', async function (next){
    try{
        if(this.isModified('password')){
            this.password = await bcrypt.hash(this.password, 12)
        }
        next();
    } catch(err){
        console.log( " this is bcrypt err" + err)
    }
})

const user = mongoose.model("ADMINLOGINS", userSchema);


module.exports = user;