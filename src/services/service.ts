import { Note} from '../models/Note';
import {INote} from '../interfaces/Note'

class NoteService {
    // Add a note
    async addNote(data: INote): Promise<INote> {
        return await Note.create(data)
    }

    // Update a note
    async updateNote(id: string, data: INote): Promise<INote | null> {
        return await Note.findByIdAndUpdate(id, data, {new: true});
    }

    // Get a single note
    async getNote(id: string): Promise<INote | null> {
        return await Note.findById(id).populate("category");
    }

    // Get all note
    async getAllNote(userId: string): Promise<INote[]>{
        return await Note.find()
        .populate("category")
        .populate("userId");

    }

    // Get by category
    async getNoteByCategoryId(id: string): Promise<INote[] | null> {
        return await Note.findOne({ 'category._id': id });
    }

    // Delete note
    async deleteNote(id: string): Promise<INote | null> {
        return await Note.findByIdAndDelete(id)
    }

    // Get user note
    async getNotesByUserId(userId: string): Promise<INote[]> {
        return await Note.find({ userId }).populate("category").exec();
      }
      
}

const noteService = new NoteService()
export default  noteService