const mongoose =require('mongoose')

const userSchema=mongoose.Schema({
    
    name: {
        type: String,
        trim: true
    },
    location:{
        type: String,
        trim: true
    }
})

const InfectedUser= mongoose.model('InfectedUser',userSchema)
module.exports= InfectedUser