const User = require("../models/userModel");
const Plant = ("../models/solarPlantModel");
 const getCustomerWithPlantDetails = async (req, res) => {
    try {
        const  limit = 10 ;
        const { page = 1} = req.body; // Default to page 1 with 10 records per page
        const userRole = req.user.role; // Make sure to get the user role from JWT/session

      
  const userWithPlantDetails = await User.aggregate([
    {
        $match: { role: { $ne: 'admin' } } // Exclude users with admin role
    },
            {
                $lookup: {
                    from: 'solarplantschemas', // Collection name in MongoDB (case-sensitive)
                    localField: '_id',
                    foreignField: 'customer_id',
                    as: 'plant_details'
                }
            },
            {
                $project: {
                  password: 0, // Exclude sensitive data like password
                  __v: 0,
                  "plants.__v": 0,
                },
              },
              {
                $sort: { created_at: -1 }, // Sort by created_at in descending order
              },
              {
                $skip: (page - 1) * limit, // Skip records for pagination
              },
              {
                $limit: limit, // Limit the number of records
              },
         ]);
         const totalRecords = await User.countDocuments(); // Total number of users for pagination metadata
         const currentPageLength = userWithPlantDetails.length; // Number of records in the current page
        res.status(200).json({ status: 'success', message: 'Customer with plant details fetched successfully' ,currentPage: page,
            totalPages: Math.ceil(totalRecords / limit),
            totalRecords,
            limit ,
            records: currentPageLength,
            data:userWithPlantDetails});
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

module.exports = {getCustomerWithPlantDetails};