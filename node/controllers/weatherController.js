import Meteo from '../models/Meteo.js'

const getweathers = async (req, res, next)=>{
    const weathers = await Meteo.find().exec()
    res.json(weathers)
}
const getweather = async (req, res, next)=>{
    const weather = await Meteo.findById(req.params.id).exec()
    res.json(weather)
}
const modifyWeather = async (req, res, next)=>{
    let weather = await Meteo.findById(req.params.id).exec()
    weather.set(req.body)
    await weather.save()
    res.json({message:"OK"})
}
const weatherController = {
    getweathers,
    getweather,
    modifyWeather
}
export default weatherController