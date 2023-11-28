import express  from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";

const app = express()

app.get('/', (req,res)=>{
    return res.send("welcome to MERN app ")
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