const mongoose = require('mongoose')

const Schema = mongoose.Schema

const todoSchema = new Schema({
    title:{
        type:String,
        require:true
    },
  
    description: {
        type: String, // Add the description field
        required: false, // Not required by default
    },

    

},{timestamps:true})

module.exports= mongoose.model('Todo', todoSchema)