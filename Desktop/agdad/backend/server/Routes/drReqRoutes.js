const express = require('express')
const router = express.Router()
const {
    submitDrReq,
    getReq,
    getAllReq,
    deletereqs
} = require('../Controllers/drReqController')





router.delete('/delete/:id', deletereqs) 

//get all phamcist requests
router.get('/',getAllReq)

//get a single req 
router.get('/:id',getReq)

//submit a new req 
router.post('/', submitDrReq)

//accept a req
router.patch('/:id',(req , res )=>{
    res.json({mssg:'this req has been acccepted'})
})

//rej a req
router.patch('/:id',(req , res )=>{
    res.json({mssg:'this req has been rejected'})
})





module.exports = router