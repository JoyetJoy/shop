const express=require('express')
const router=express.Router()

const shopifyController=require('../controller/shopifyController')

router.post('/orders/create',shopifyController.orderPost)
router.post('/orders/updated',shopifyController.orderUpdated)
router.post('/orders/fullfilled',shopifyController.orderFullfilled)
router.post('/orders/delete',shopifyController.orderDelete)

module.exports=router