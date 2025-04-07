import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import noteService from '../services/service';
import categoryService from '../services/categoryService';
import userService from '../services/usersService';

export const createNote = async (req: Request, res: Response, next: NextFunction) => {
  try {

    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { title, content, category } = req.body;
    const user = JSON.stringify(req.user, null, 2)
    const userObject = JSON.parse(user);
    // const {userId: string} = req.user
    const userId = userObject.userId;
    console.log(userId);
    req.body.userId = userId
    


    //Validate category ID format before querying MongoDB
    if (!mongoose.Types.ObjectId.isValid(category)) {
      res.status(400).json({
        success: false,
        message: 'Invalid category ID format ',
      });
      return
    }

    // Check if category exists
    const existingCategory = await categoryService.getCategoryById(category);
    console.log(existingCategory);
    
    if (!existingCategory) {
      res.status(400).json({
        success: false,
        message: 'Category not found',
      });
      return
    }


    // Check if note already exists for the user
    const userNotes = await noteService.getNotesByUserId(userId);
    const existingNote = userNotes.find((note) => note.title === title);
    if (existingNote) {
      res.status(400).json({
        success: false,
        message: 'Note already exists',
      });
      return
    }

    // Create the new note
    const newNote = await noteService.addNote(req.body,);

    res.status(201).json({
      success: true,
      message: 'Note created successfully',
      note: newNote,
    });

  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
    return
  }
};

// get note
export const getNote = async (req: Request, res: Response, next: NextFunction) => {
  const { noteId} = req.params;
  const user = JSON.stringify(req.user, null, 2)
  const userObject = JSON.parse(user);
  const userId = userObject.userId;
  console.log(userId);
 
  try {

  //Validate user ID format before querying MongoDB
    if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({
      success: false,
      message: 'Invalid userId format ',
    });
    return
  }
  // Check if user exists
  const existingUser = await userService.getById(userId);
  console.log(existingUser);
  
  if (!existingUser) {
    res.status(404).json({
      success: false,
      message: 'Invalid userId',
    });
  return
  }
  const result = await noteService.getNote(noteId);
  res.status(200).json({
    success: true,
    message: 'Note fetched successfully',
    note: result
  });
} catch (error) {
  res.status(400).json({
    success: false,
    message: `No note with id: ${noteId}`
  });
}
}

  // Get all notes
export const getAllNote = async (req: Request, res: Response, next: NextFunction) => {
  const user = JSON.stringify(req.user, null, 2)
  const userObject = JSON.parse(user);
  const userId = userObject.userId;
  console.log(userId);

 
  
  try {
    //Validate user ID format before querying MongoDB
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({
        success: false,
        message: 'Invalid userId format ',
      });
      return
    }

    // Check if user exists
    const existingUser = await userService.getById(userId);
    if (!existingUser) {
      res.status(404).json({
        success: false,
        message: 'Invalid userId',
      });
      return
    }

    const note = await noteService.getNotesByUserId(userId);
    if (note) {
      res.status(200).json({
        success: true,
        message: 'Note fetched successfully',
        data: note
    })
  }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid UserId'
    })
  }
}

// update note
export const updateNote =  async (req: Request, res: Response, next: NextFunction) => {
  const noteId = req.params.noteId;
  const details = req.body;
  const { category} = req.body;
  console.log(noteId, category);
  const user = JSON.stringify(req.user, null, 2)
  const userObject = JSON.parse(user);
  const userId = userObject.userId;
  console.log(userId);

  
  try {
    //Validate note ID format before querying MongoDB
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      res.status(400).json({
      success: false,
      message: 'Invalid note ID format ',
    });
    return
    }

    //Validate category ID format before querying MongoDB
    if (!mongoose.Types.ObjectId.isValid(category)) {
      res.status(400).json({
        success: false,
        message: 'Invalid category ID format ',
      });
      return
    }


    // check if note exist
    const existingNote = await noteService.getNote(noteId);
    if (!existingNote) {
      res.status(400).json({
        success: false,
        message: `Note with id: ${noteId} not found`
      });
      return
    }

    // Check if category exists
    const existingCategory = await categoryService.getCategoryById(category);
    console.log(existingCategory);
    
    if (!existingCategory) {
      res.status(400).json({
        success: false,
        message: 'Category not found',
      });
      return
    }


    const newNote = await noteService.updateNote(noteId, details)
    res.status(200).json({
      success: true,
      message: 'Note updated successfully',
      data: newNote
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err
    });
  }
} 

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  const user = JSON.stringify(req.user, null, 2)
  const userObject = JSON.parse(user);
  const userId = userObject.userId;
  console.log(userId);
  
  try {
    
    const categories = await categoryService.getAllCategory(userId)
    res.status(200).json({
      success: true,
      message: 'Categories fetched successfully',
      data: categories
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

export const deleteNote = async (req: Request, res: Response, next: NextFunction) => {
    const noteId = req.params.noteId
    const user = JSON.stringify(req.user, null, 2)
    const userObject = JSON.parse(user);
    const userId = userObject.userId;
    console.log(userId);
    
    try {

      //Validate note ID format before querying MongoDB
      if (!mongoose.Types.ObjectId.isValid(noteId)) {
        res.status(400).json({
        success: false,
        message: 'Invalid note ID format ',
      });
      return
      }

      const note = await noteService.deleteNote(noteId);
      if (!note){
        res.status(400).json({
          success: false,
          message: `No note found with id: ${noteId}`
        })
      }
      res.status(200).json({
        success: true,
        message: `Note with id: ${noteId} deleted successfully`,
        deletedNote: note
      })
      
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      })
    }
    
  }

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  const {name} = req.body
  const user = JSON.stringify(req.user, null, 2)
  const userObject = JSON.parse(user);
  const userId = userObject.userId;
  console.log(userId);
  

  try {
    // check if category exist
    const existingCategory = await categoryService.getCategory(name);
    console.log(existingCategory);
    
    if (existingCategory) {
      res.status(400).json({
        success: false,
        message: 'Category already exist',
      });
      return
    }
    const category = await categoryService.createCategory(req.body) 
    res.status(200).json({
      success: true,
      message: 'Category create successfully',
      date: category
    })
    return
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid data"
    })
  }
}
