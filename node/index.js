import mongoose from 'mongoose'
import 'dotenv/config'
import express from 'express'
import Meteo from './models/Meteo.js'

let Mongo_USERNAME=process.env.Mongo_USERNAME
let Mongo_PASSWORD=process.env.Mongo_PASSWORD
let Mongo_DB=process.env.Mongo_DB

mongoose.connect(`mongodb+srv://${Mongo_USERNAME}:${Mongo_PASSWORD}@introduction.mcajypg.mongodb.net/${Mongo_DB}`)

const report = await Meteo.findById("65ba6b5a76e007eeb8ecf34a").exec()
console.log(report)

const app = express();
const PORT = process.env.PORT || 4111;
app.listen(PORT, console.log("Server running on port: " + PORT))
