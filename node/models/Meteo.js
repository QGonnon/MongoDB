import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const meteoSchema = new Schema({
  date: String,
  tmax: Number,
  tmin: Number,
  tavg: Number,
  departure: Number,
  HDD: Number,
  CDD: Number,
  precipitation: Number,
  new_snow: Number,
  snow_depth: Number,
},
{collection : 'meteo'});

const Meteo = model('meteo', meteoSchema);
export default Meteo;