const express = require('express');
const router = express.Router();
const FamilyMemberController = require('../Controllers/FamilyMemberController');

// Define routes for Health Packages
router.post('/', FamilyMemberController.createFamilyMember);
router.get('/', FamilyMemberController.getAllFamilyMembers);
router.put('/:id', FamilyMemberController.updateFamilyMember);
router.delete('/:id', FamilyMemberController.deleteFamilyMember);

module.exports = router;
