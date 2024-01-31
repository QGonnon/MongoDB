import mongoose from 'mongoose'
import 'dotenv/config'

let Mongo_USERNAME=config.env.Mongo_USERNAME
let Mongo_PASSWORD=config.env.Mongo_PASSWORD

mongoose.connect(`mongodb+srv://${Mongo_USERNAME}:${Mongo_PASSWORD}@introduction.mcajypg.mongodb.net/`)

const express = require('express');
const app = express();
const PORT = process.env.PORT || 4111;
app.listen(PORT, console.log("Server running on port: " + PORT))
