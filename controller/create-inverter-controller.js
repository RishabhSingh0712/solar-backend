const inverterModel = require("../models/inverterSchema");
exports.createInverter = async (req, res) => {
    try {
      const { plant_id,inverter_id, inverter_name, capacity_kw, status } = req.body;
      const newInverter = new inverterModel({
        plant_id,
        inverter_id,
        inverter_name,
        capacity_kw,
        status
      });
  
      const savedInverter = await newInverter.save();
      res.status(201).json({ message: "Inverter created successfully", data: savedInverter });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error creating inverter", error: err.message });
    }
  };
  
  // Get all inverters
  exports.getAllInverters = async (req, res) => {
    const { plant_id } = req.body;
try{
    // Check if plant_id is provided
    if (!plant_id) {
      return res.status(400).json({ message: "plant_id is required" });
    }

    
    // Query the inverterModel to find inverters related to the given plant_id
    const inverters = await inverterModel
      .find({ plant_id: plant_id })  // Querying with string plant_id
      .populate("plant_id", "plant_name ,capacity_kw"); // Populate plant data

console.log('inverters--->>>',inverters);
    // If no inverters are found, return a 404 response
    if (!Array.isArray(inverters) || inverters.length === 0) {
      console.log(`No inverters found for plant_id: ${plant_id}`);
      return res.status(200).json({ message: `No inverters found for plant_id: ${plant_id}` });
    }

    // Return the inverters data
    res.status(200).json({ message: "Inverters fetched successfully", data: inverters });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching inverters", error: err.message });
  }
};
  
  // Get a single inverter by ID
  exports.getInverterById = async (req, res) => {
    console.log('hhkhggkiyhi')
    const { inverter_id } = req.body;  // Extract inverter_id from the body
    console.log('inverter_id', inverter_id);  // Check if it's received correctly
    
    try {
        // Find inverter by the provided inverter_id
        const inverter = await inverterModel.findOne({ inverter_id: inverter_id });

        if (!inverter) {
            return res.status(404).json({ message: "Inverter not found" });
        }

        // Return the found inverter
        res.status(200).json({ message: "Inverter fetched successfully", data: inverter });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching inverter", error: err.message });
    }
};

  
  // Update an inverter by ID
  exports.updateInverter = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
  
      const updatedInverter = await inverterModel.findByIdAndUpdate(id, updatedData, { new: true });
  
      if (!updatedInverter) {
        return res.status(404).json({ message: "Inverter not found" });
      }
  
      res.status(200).json({ message: "Inverter updated successfully", data: updatedInverter });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error updating inverter", error: err.message });
    }
  };
  
  // Delete an inverter by ID
  exports.deleteInverter = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedInverter = await inverterModel.findByIdAndDelete(id);
  
      if (!deletedInverter) {
        return res.status(404).json({ message: "Inverter not found" });
      }
  
      res.status(200).json({ message: "Inverter deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleting inverter", error: err.message });
    }
  };
  