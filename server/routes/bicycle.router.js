
import express from "express"
import {  getBicyclesBySearch, getBicyle, getBicyles } from "../controllers/bicycle.controller.js";

const router = express.Router()

router.get('/', getBicyles)
router.get('/search', getBicyclesBySearch)
router.get('/:id', getBicyle)

export default router;