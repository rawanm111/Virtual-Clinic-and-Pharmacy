const meds = require('../Models/meds.js');
const notifcontroller = require('../Controllers/notifControllers');
exports.createmeds = async (req, res) => {
  try {
    const newmed = new meds(req.body);
    const savedmed = await newmed.save();
    console.log("hey");
    res.status(201).json(savedmed);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

exports.getAllmeds = async (req, res) => {
  try {
    const findmed = await meds.find();
    res.status(200).json(findmed);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updatemeds = async (req, res) => {
  try {
    const updatedmed = await meds.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedmed);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deletemeds = async (req, res) => {
  try {
    await meds.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json(err);
  }
};


// Update medication description
exports.updateDescription = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    // Find the medication by ID and update its description
    const updatedmed = await meds.findByIdAndUpdate(
      id,
      { description },
      { new: true }
    );

    if (!updatedmed) {
      return res.status(404).json({ message: 'Medication not found' });
    }

    res.status(200).json(updatedmed);
  } catch (err) {
    console.error('Error updating description:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update medication price
exports.updatePrice = async (req, res) => {
  try {
    const { id } = req.params;
    const { price } = req.body;

    // Find the medication by ID and update its price
    const updatedmed = await meds.findByIdAndUpdate(
      id,
      { price },
      { new: true }
    );

    if (!updatedmed) {
      return res.status(404).json({ message: 'Medication not found' });
    }

    res.status(200).json(updatedmed);
  } catch (err) {
    console.error('Error updating price:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update medication picture
exports.updatePicture = async (req, res) => {
  try {
    const { id } = req.params;
    const { picture } = req.body;

    // Find the medication by ID and update its picture
    const updatedmed = await meds.findByIdAndUpdate(
      id,
      { picture },
      { new: true }
    );

    if (!updatedmed) {
      return res.status(404).json({ message: 'Medication not found' });
    }

    res.status(200).json(updatedmed);
  } catch (err) {
    console.error('Error updating picture:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
// ...

// Fetch a single medication by ID
exports.getMedicationById = async (req, res) => {
  try {
    const { medicationId } = req.params;
    const medication = await meds.findById(medicationId);

    if (!medication) {
      return res.status(404).json({ message: 'Medication not found' });
    }

    res.status(200).json(medication);
  } catch (err) {
    console.error(`Error fetching medication by ID: ${err}`);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getMedicationAlternatives =  async (req, res) => {
  try {
    const medicationID = req.params.id;
    const medication = await meds.findById(medicationID);
    if (!meds) {
      return res.status(404).json({ message: 'Medication not found' });
    }
    const alternatives = await meds.find({
      activeIngredient: medication.activeIngredient,
      availableQuantity: { $gt: 0 },
      _id: { $ne: medicationID }
    });
    

    res.status(200).json(alternatives);
  } catch (err) {
    console.error(`${err}`);
    res.status(500).json(err);
  }

}
exports.deductQuantity = async (req, res) => {
  try {
    const { medicationId } = req.params;
    const { quantity } = req.body;

    const medication = await meds.findById(medicationId);

    if (!medication) {
      return res.status(404).json({ message: 'Medication not found' });
    }

    

    // Deduct the quantity from the inventory
    medication.availableQuantity -= quantity;

    // Save the updated medication
    await medication.save();
    console.log('Medication updated:', medication);
    if (medication.availableQuantity === 0) {
      console.log('Quantity reached zero. Adding notification.');

      const newReq = {
        ...req,
        body: {
          content: medication.name,
        },
      };

      // Pass the new request and the original response to addNotificationPharm
      await notifcontroller.addNotificationPharm(newReq, res);
      console.log(' Added notification.');
      return;
    }


    res.status(200).json({ message: 'Quantity deducted successfully' });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json(err);
  }
};

// ...
