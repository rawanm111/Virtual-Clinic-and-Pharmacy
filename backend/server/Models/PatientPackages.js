const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const PatientPackagesschema= new mongoose.Schema({
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'patients',
        required: false,
      },

     package: {
        type: String,
        required: true,
        }, 
     
    status:{
        type: String,
        required:true,
    },
    startdate:{
        type: String,
        required:true,
    },
    enddate:{
        type: String,
        required:true,
    },

});
module.exports=mongoose.model('PatientPackages',PatientPackagesschema); 
