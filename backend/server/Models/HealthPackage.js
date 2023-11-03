const mongoose = require('mongoose');

const healthPackageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  annualPrice: {
    type: Number,
    required: true,
  },
  discountOnDoctorSessionPrice: {
    type: Number,
    required: true,
  },
  discountOnMedicineOrders: {
    type: Number,
    required: true,
  },
  discountOnFamilyMemberSubscription: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('HealthPackage', healthPackageSchema);
