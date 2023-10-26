const e = require('express')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name:{type: String, default:null},
    last_name: {type:String ,default:null},
    email:{type:String, unique:true},
    password: {type:String},
    token:{type:String},
    role:{ type:String, default:'user', validate: {
        validator: function(v) {
            return v === 'user'
        },
        message: props => `${props.value} is not a valid role. Only 'user' is allowed.`
    }}
})


module.exports = mongoose.model("User", userSchema)
