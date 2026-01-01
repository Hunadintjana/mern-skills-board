import Note from "../models/Notes.js";


export async function getAllNotes(req,res){

    try {
        const notes = await Note.find().sort({createdAt: -1});
        res.status(200).json(notes);
    } 
    catch (error) {
        console.error("Error on getAllNotes Methods")
        res.status(500).json({message:"Internal server error"});
    }

}


export async function getNoteByID(req,res) {
    try {
        const note = await Note.findById(req.params.id);
        if(!note) return res.status(404).json({message: "Note not found"});
        res.json(note);
    } 
    catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
}


export async function createNote(req,res){

    try {
        const {title, content} = req.body;

        const note = new Note({title,content});

        await note.save();
        res.status(201).json({message:"Note Created successfully"});
    } 
    catch (error) {
        res.status(500).json({message:"Internal server error"});
    }

}

export async function updateNote(req,res){
    try {
        const {title, content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            {
                new: true,
            }
        );

        if(!updatedNote) return res.status(404).json({message:"Note not found"});

        res.status(200).json({message:"Note Updated SuccessFully"});
    }
     catch (error) {
        res.status(500).json({message:"Internal server error 2"});
    }
}

export async function deleteNote(req,res){

    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote) return res.status(404).json({message: "Failed to delete note"});

        // ✅ Send a response when deletion succeeds
        return res.status(200).json({ message: "Note deleted successfully" });

    } 
    catch (error) {
        res.status(500).json({message: "Internal server error"})
    }


}