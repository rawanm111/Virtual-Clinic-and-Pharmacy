const FamilyMember = require('../Models/FamilyMember');

// Create a new Health member
exports.createFamilyMember = async (req, res) => {
  try {
    const newMember = new FamilyMember(req.body);
    const savedMember = await newMember.save();
    res.status(201).json(savedMember);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Retrieve all Health member
exports.getAllFamilyMembers = async (req, res) => {
  try {
    const member = await FamilyMember.find();
    res.status(200).json(member);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update a Health member
exports.updateFamilyMember = async (req, res) => {
  try {
    const updatedmember = await FamilyMember.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedmember);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete a Health member
exports.deleteFamilyMember = async (req, res) => {
  try {
    await FamilyMember.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json(err);
  }
};
