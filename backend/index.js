import express  from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoutes from "./routes/booksRoutes.js"
import cors from 'cors'
const app = express()

app.use(express.json())

//using middleware for cors
app.use(cors({
    origin:'http://localhost:3000',
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:['Content-Type'],
}));


app.get('/', (req,res)=>{
    return res.send("welcome to MERN app ")
})

app.use('/books',booksRoutes)


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