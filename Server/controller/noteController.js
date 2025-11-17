import Note from "../Model/noteModel.js";

const createNote=async(req,res)=>{

    try{
        const note=new Note({
            title:req.body.title,
            description :req.body.description

        });
        await note.save();
        res.status(201).send("Note Created Succesfully");
    }catch(error){
        res.status(500).send(error);
    }
}

const getAllNotes=async(req,res)=>{
    try{
        const notes=await Note.find({isDeleted:false});
        res.status(200).json(notes);
    }catch(error){
        res.status(500).send("Error while fetchig notes")
    }
}

const updateNote = async (req, res) => {
    try {
        let noteDetail = req.body;
        const result = await Note.updateOne(
            { _id: noteDetail.id },
            { $set: { title: noteDetail.title, description: noteDetail.description } }
        );
        await Note.updateOne({ _id: noteDetail.id }, { $inc: { UpdatedCount: 1 } });
        res.status(200).send("Note Updated Successfully,Updated Note"+JSON.stringify(result));
    } catch (error) {
        res.status(500).send("Error while updating note");
    }
}

const deleteNote=async(req,res)=>{
    try{
        const noteId=req.body;
        const result=await Note.updateOne(
            {_id:noteId.id},
            {$set:{isDeleted:true}}
        );
        res.status(200).send("Note Deleted Successfully,Deleted Note"+JSON.stringify(result));
    }catch(error){
        res.status(500).send("Error while deleting note");
    }
}   

const getDeletedNotes=async(req,res)=>{
    try{
        const deletedNotes=await Note.find({isDeleted:true});
        res.status(200).json(deletedNotes);
    }catch(error){
        res.status(500).send("Error while fetching deleted notes");
    }
}   

export {createNote,getAllNotes,updateNote,deleteNote,getDeletedNotes};