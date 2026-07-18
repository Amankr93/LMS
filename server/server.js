import express from "express";
import cors from "cors";
import 'dotenv/config'
import mongoose from "mongoose";
import connectdb from "./configs/mongodb.js";
import { clerkwebhook } from "./controller/webhooks.js";

const app= express();
await connectdb();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.get('/', (req,res, next)=>{
      res.send("Api is working");

})
app.post('/clerk', express.json(), clerkwebhook)

app.listen(PORT, ()=>{
    console.log("server is running on port:", PORT)
})