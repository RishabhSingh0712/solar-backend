const InverterData  = require('../models/solarInverterDataModel');
const {emitInverterData} = require('../utils/socket');

// Controller function to get distinct inverters by plant ID
exports.addInverterData = async (req, res) => {
    try {
        const newData = new InverterData(req.body);
        const savedData = await newData.save();
     
     
       emitInverterData(savedData);
        res.status(200).json({ message: "Data saved successfully", data: savedData });
    } catch (error) {
        console.log("Error saving inverter data:", error);
        res.status(500).json({ error: "Failed to save data" });
    }
};

// GET - Fetch data by customer ID
exports.getInverterDataByCustomer = async (req, res) => {
    const { customerId } = req.params;
    try {
        const data = await InverterData.find({ customer_id: customerId }).sort({ timestamp: -1 });
        res.status(200).json(data);
    } catch (error) {
        console.log("Error fetching data:", error);
        res.status(500).json({ error: "Failed to retrieve data" });
    }
};