import express  from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express()

app.use(express.json())

app.get('/', (req,res)=>{
    return res.send("welcome to MERN app ")
})

app.post('/books',async(req,res)=>{
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
app.get('/books',async(req,res)=>{
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
app.get('/books/:id',async (req,res)=>{
    try{
        
        const {id} = req.params 
        const book = await Book.findById(id)

        return res.status(200).json(book)
    }catch(error){
        console.log(error.message)
        res.send(500).send({message:error.message})
    }
})

app.put('/books/:id', async(req,res)=>{
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

mongoose.connect(mongoDBURL)
.then(()=> {console.log("DB is successfuly connected");
app.listen(PORT, (err)=>{
    if(err){
        console.log("there is something fishy")
    }else{
        console.log("port is running")
    }
})
}).catch((error)=>{
    console.log(error)
})