import mongoose, { Schema, Document } from "mongoose";
import {INote} from '../interfaces/Note'

// Define Note Model
export interface INoteModel extends INote, Document {}

// Define Note Schema
const NoteSchema: Schema = new Schema(
    {
      title: { type: String, required: true, trim: true },
      content: { type: String, required: true },
      category: { type: Schema.Types.ObjectId, ref: "Category"},
      userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true, versionKey: false}
  );
  
// Export Mongoose models
export const Note = mongoose.model<INoteModel>("Note", NoteSchema);