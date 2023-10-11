const mongoose= require('mongoose');
const appoinschema= new mongoose.Schema({
    pid:{
        type: String,
        required:true,
    },
   did:{
        type: String,
        required:true,
    },
    status:{
        type: String,

        required:true,
    },
    date:{
        type: Date,
        required:true,
    },
    
    
    

});
module.exports=mongoose.model('appointements',appoinschema);