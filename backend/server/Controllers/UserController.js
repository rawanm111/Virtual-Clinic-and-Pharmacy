const User = require('../Models/User');


exports.createUser = async (req, res) => {   
  try {
    const newUser= new User(req.body);     
    const savedUser = await newUser.save();       
    res.status(201).json(savedUser); 
  } catch (err) {
    res.status(500).json(err);
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const Users = await User.find();
    res.status(200).json(Users);
  } catch (err) {
    res.status(500).json(err);
  }
};


exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};


exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json(err);
  }
};
