import express from 'express'
import weatherRouter from './routes/weatherRouter.js'
import mongoose from 'mongoose'
import 'dotenv/config'

const Mongo_CONNECTION_STRING=process.env.Mongo_CONNECTION_STRING
const PORT = process.env.PORT || 4111;

const app = express();

async function connect(){
    try{
        app.use(express.json())
        await mongoose.connect(Mongo_CONNECTION_STRING)
        console.log("MongoDB connected")
        app.use("/weather", weatherRouter)
        app.listen(PORT, console.log("Server running on port: " + PORT))
    }
    catch(err){
        console.log(err)
    }
}

connect()



