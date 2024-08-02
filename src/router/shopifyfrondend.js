const express=require('express')
const router=express.Router()

const orderController=require('../controller/showOrders')

router.get('/orders',orderController.orderGet)


module.exports=router