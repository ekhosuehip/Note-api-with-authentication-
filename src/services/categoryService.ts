import Category from '../models/Category'
import { ICategory } from '../interfaces/Category'

class CategoryController {
    // get category by name
    async getCategoryById(id: string): Promise<ICategory | null> {
        return await Category.findById(id)
    }

    // create new category
    async createCategory(date: ICategory) {
        return await Category.create(date)
    }

    // get all cetegory
    async getAllCategory(userId: string) {
        return await Category.find()
    }

    async getCategory(title: string){
        return await Category.findOne({"name": title})
    }

}

const categoryService = new CategoryController();
export default categoryService