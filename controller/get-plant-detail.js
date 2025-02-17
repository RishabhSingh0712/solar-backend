const SolarPlantModel = require("../models/solarPlantModel");
const InverterModel = require("../models/inverterSchema");

exports.getFullPlantDetails = async (req, res) => {
  try {
    const { plant_id } = req.params; // Get the plant_id from the URL params

    // Query the SolarPlantModel schema to get the plant details
    const plantDetails = await SolarPlantModel.findOne({ plant_id });

    if (!plantDetails) {
      return res.status(404).json({ message: "Plant not found" });
    }

    // Query the InverterModel schema to count the number of InverterModels for the given plant_id
    const InverterModelCount = await InverterModel.countDocuments({ plant_id });

    // Combine plant details and InverterModel count
    const response = {
      plantDetails,
      numberOfInverterModels: InverterModelCount,
    };

    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching plant details", error: err.message });
  }
};
