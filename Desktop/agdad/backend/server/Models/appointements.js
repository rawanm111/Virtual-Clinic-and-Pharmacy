const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const appoinschema= new mongoose.Schema({
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'patients',
        required: false,
      },
      doctor: {
        type: Schema.Types.ObjectId,
        ref: 'doctors',
        required: true,
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
