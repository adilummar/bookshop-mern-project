import express from "express"
import { Book } from "../models/bookModel.js"

const router = express.Router()

router.post('/',async(req,res)=>{
    try{if(
        !req.body.title||
        !req.body.author||
        !req.body.publishYear
    ){
        return res.status(400).send({message:"send all required files: title,author, publishedYear",})
    }
        
        const newBook = {
            title:req.body.title,
            author:req.body.author,
            publishYear:req.body.publishYear
        }
        const book = await Book.create(newBook)
        return res.status(201).send(book)
    


    }catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message})
    }
})
// get all book list
router.get('/',async(req,res)=>{
    try{
         const books = await Book.find({});
         return res.status(200).json({
            count:books.length,
            data:books
         });
    }catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message})
    }
})

//get one book by id 
router.get('/:id',async (req,res)=>{
    try{
        
        const {id} = req.params 
        const book = await Book.findById(id)

        return res.status(200).json(book)
    }catch(error){
        console.log(error.message)
        res.send(500).send({message:error.message})
    }
})

router.put('/:id', async(req,res)=>{
    try{
        if(!req.body.title||
            !req.body.author||
            !req.body.publishYear){
                return res.status(500).send({message:"send all required files: title, author, published year"})
        }
        const {id} = req.params;

        const result = await Book.findByIdAndUpdate(id,req.body)
        
        if(!result){
            res.status(500).send({message:"book not found"})
        }else{
            res.status(200).send({message:"book updated successfuly"})
        }

    }catch(error){
        console.log(error.message)
        res.status(500).send({meassage:error.message})
    }
})

// deleting a book from DB
router.delete('/:id', async(req,res)=>{
    try{
        const {id} = req.params

        const result = await Book.findByIdAndDelete(id)

        if(!result){
            res.status(404).send({message:"Book not found"})
        }else{
            res.status(200).send({message:"Book deleted successfully"})
        }

    }catch(error){
        console.log(error.message)
        res.status(500).send({message:error.message})
    }
})

export default router
