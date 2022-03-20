const mongoose = require('mongoose');
const validator= require("validator")

const authorSchema = new mongoose.Schema( {
    fname: {
        type:String,
        required:true,
    },
    lname: {
        type:String,
        required:true,
    },
    title: {
        type: String,
       
        enum: ["Mr", "Mrs", "Miss"]
    },
    emailId:{
        type:String,
        unique:true,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is inValid");
            }
        }
    },
    password:{
        type:Number,
        unique:true,
        required:true,
    },
    isdeleted:{
        type:Boolean,
        default:false,
    },
}, { timestamps: true });

module.exports = mongoose.model('Author', authorSchema) 



