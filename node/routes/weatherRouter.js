import express from "express";
import weatherController from "../controllers/weatherController.js";

const router = express.Router()

router.get("/", weatherController.getweathers)
router.get("/:id", weatherController.getweather)
router.put("/:id", weatherController.modifyWeather)

export default router