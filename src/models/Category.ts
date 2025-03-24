import mongoose, { Schema } from 'mongoose';
import { ICategory } from '../interfaces/Category';

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [200, 'Description cannot be more than 200 characters']
    },
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Category = mongoose.model<ICategory>('Category', categorySchema);

export default Category;