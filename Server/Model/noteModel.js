import mongoose, { trusted } from "mongoose";

const noteSchema = new mongoose.Schema({    
     title :{
        type : String,
        required :true
    },
    description :{
        type :String,
        required :true
    },
    updatedAt :{
        type : Date,
        default :Date.now
    },
    UpdatedCount :{
        type : Number,
        default :0
    },
    isDeleted :{
        type : Boolean,
        default :false
    },
    createdAt :{
        type : Date,
        default :Date.now
    }
})

const Note=mongoose.model("Note",noteSchema);

export default Note;