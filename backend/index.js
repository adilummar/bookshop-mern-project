import express  from "express";
import { PORT } from "./config.js";

const app = express()
app.listen(PORT, (err)=>{
    if(err){
        console.log("there is something fishy")
    }else{
        console.log("port is running")
    }
} )