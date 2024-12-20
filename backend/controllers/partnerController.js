import DeliveryPartner from "../models/DeliveryPartner.js";

// Fetch all partners
export const getAllPartners = async (req, res) => {
  try {
    const partners = await DeliveryPartner.find();
    res.status(200).json(partners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new partner
export const addPartner = async (req, res) => {
  try {
    const newPartner = new DeliveryPartner(req.body);
    await newPartner.save();
    res.status(201).json(newPartner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a partner
export const updatePartner = async (req, res) => {
  try {
    const updatedPartner = await DeliveryPartner.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedPartner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a partner
export const deletePartner = async (req, res) => {
  try {
    await DeliveryPartner.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Partner deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


