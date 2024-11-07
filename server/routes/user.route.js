

import express from "express"
import { deleteUser, deleteUserBicycle, getUser, getUserBicycles, test, updateUser } from "../controllers/user.controller.js"
import { verifyToken } from "../utils/verifyUser.js"
import { postBicyle, updateBicycle } from "../controllers/bicycle.controller.js"

const router = express.Router()

router.get('/test', test)

router.post('/update/:id', verifyToken, updateUser)
router.delete('/delete/:id', verifyToken, deleteUser)
router.get('/:id', getUser)


// bicycle routes related to an authenticated user
router.get('/bicycles/:id', verifyToken, getUserBicycles)
// router.delete('/bicycles/:userId/delete/:bicycleId', verifyToken, deleteUserBicycle)
router.post('/bicycles', verifyToken, postBicyle)
router.post('/bicycles/:id', verifyToken, updateBicycle)
router.delete('/bicycles/:bicycleId', verifyToken, deleteUserBicycle)



export default router 