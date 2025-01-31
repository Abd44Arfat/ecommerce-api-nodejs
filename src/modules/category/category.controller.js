import slugify from "slugify"
import { Category } from "../../../database/models/category.model.js"

const addCategory =async (req,res,next)=>{
req.body.slug= slugify(req.body.name)
let category=new Category(req.body)
await category.save()

res.json({message:"success",category })

}

const allCategories =async (req,res,next)=>{
    let categories=await Category.find()
    
    res.json({message:"success",categories })
    
    }


    const getCategory =async (req,res,next)=>{
        let category=await Category.findById(req.params.id)
        
        res.json({message:"success",category})
        
        }

        const updateCategory =async (req,res,next)=>{
            req.body.slug= slugify(req.body.name)

            let category=await Category.findByIdAndUpdate(req.params.id,req.body,{new:true})
            
            res.json({message:"success",category})
            
            }

            
        const deleteCategory =async (req,res,next)=>{
            let category=await Category.findByIdAndDelete(req.params.id)
            
            res.json({message:"success",category})
            
            }
    

export {


    addCategory,
    allCategories,
    getCategory,
    updateCategory,
    deleteCategory

}