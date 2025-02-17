const User = require('../models/userModel')
const Plants = require('../models/solarPlantModel')
exports.getPlantsByCustomer = async (req, res) => {
    try {
      // Extract customer_id from the request parameters (or body)
      const { customer_id } = req.body;
  
      // Check if customer_id is provided
      if (!customer_id) {
        return res.status(400).json({ message: "customer_id is required" });
      }else{
        
      }
  
      // Query the SolarPlant collection to find plants associated with the customer_id
      const plants = await Plants.find({ customer_id: customer_id }).populate("plant_id","plant_name");
  
      // If no plants are found, return a 404 response
      if (plants.length === 0) {
        return res.status(404).json({ message: "No plants found for the given customer_id" });
      }
  
      // Return the list of plants associated with the customer
      res.status(200).json({
        message: "Plants fetched successfully",
        data: plants
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching plants", error: err.message });
    }
  };