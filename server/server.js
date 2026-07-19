import express from "express";
import cors from "cors";
import 'dotenv/config'
import mongoose from "mongoose";
import connectdb from "./configs/mongodb.js";
import { clerkwebhook } from "./controller/webhooks.js";
import educatorRouter from "./routes/educatorRoutes.js";
// initialize express 
const app= express();
// connect to db
await connectdb();
// middleware
app.use(cors());

// Routes
app.get('/', (req,res)=>{
      res.send("Api is working");
})
app.post('/clerk', express.json(), clerkwebhook)
app.use('/api/educator', express.json(), educatorRouter)

// Port
const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log("server is running on port:", PORT)
})