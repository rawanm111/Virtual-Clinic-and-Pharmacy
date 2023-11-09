const express = require('express')
const router = express.Router()
const {
    submitPharmcistReq,
    getReq,
    getAllReq,
    deletereqs
} = require('../Controllers/pharmcistReqController')






//get all phamcist requests
router.get('/',getAllReq)

//get a single req 
router.get('/:id',getReq)

//submit a new req 
router.post('/', submitPharmcistReq)
router.delete('/delete/:id', deletereqs) 
//accept a req
router.patch('/:id',(req , res )=>{
    res.json({mssg:'this req has been acccepted'})
})

//rej a req
router.patch('/:id',(req , res )=>{
    res.json({mssg:'this req has been rejected'})
})





module.exports = router