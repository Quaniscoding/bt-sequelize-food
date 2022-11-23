
const express = require('express');
const userRoute = express.Router();
const { like, unLike, getLikeRes, getLikeUser, postRate, getRateRes, getRateUser, postOrder } = require('../controllers/userController');

//like 
userRoute.post("/like", like)

//unLike
userRoute.post("/unLike/:res_id", unLike)

//getLikeRes
userRoute.get("/getLikeRes/:res_id", getLikeRes)

//getLikeUser
userRoute.get("/getLikeUser/:user_id", getLikeUser)

// post rate
userRoute.post("/postRate/:res_id", postRate)

//getRateRes
userRoute.get("/getRateRes/:res_id", getRateRes)

//getRateUser
userRoute.get("/getRateUser/:user_id", getRateUser)

//postOrder
userRoute.post("/postOrder/:food_id", postOrder)
module.exports = userRoute;
