

import express from "express"
import { adminDeleteUser, deleteUser, deleteUserBicycle, getUser, getUserBicycles, getUsers, test, updateUser } from "../controllers/user.controller.js"
import { verifyToken } from "../utils/verifyUser.js"
import { postBicyle, updateBicycle } from "../controllers/bicycle.controller.js"

const router = express.Router()

router.get('/test', test)

router.post('/update/:id', verifyToken, updateUser)
router.delete('/delete/:id', verifyToken, deleteUser)
router.delete('/admin/delete/:id', verifyToken, adminDeleteUser)
router.get('/:id', getUser)
router.get('/', getUsers)


// bicycle routes related to an authenticated user
router.get('/bicycles/:id', verifyToken, getUserBicycles)
// router.delete('/bicycles/:userId/delete/:bicycleId', verifyToken, deleteUserBicycle)
router.post('/bicycles', verifyToken, postBicyle)
router.post('/bicycles/:id', verifyToken, updateBicycle)
router.delete('/bicycles/:bicycleId', verifyToken, deleteUserBicycle)



export default router 