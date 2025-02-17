const express = require("express");
const dotenv = require("dotenv");
const {validateAndSendVerificationEmail} = require('./middlewares/errorHandler');
const authRoutes = require("./routes/userRoutes");
const plantRoutes = require('./routes/create-plant-route');
const inverterRoutes = require('./routes/create-inverter-route');
const getPlantDetailRoute = require('./routes/get-plant-detail-route')
const inverterDataRoutes = require('./routes/send-inverter-data-routes');
const sensorDataRoutes = require('./routes/send-sensor-data-route');
const adminNotificationRoutes = require('./routes/send-notification-admin-route');
const userPlantRoutes = require('./routes/user-plant-route');
const getPlantsByCustomerRoute = require('./routes/get-plant-by-user');
const socketIo = require('socket.io');
const cors = require('cors');
const http = require('http');
const bodyParser = require("body-parser");
dotenv.config();
const {initSocket} = require('./utils/socket');
const dbConnect = require("./config/dbConnect");
const app = express();
dbConnect();

const PORT= process.env.PORT || 5000;
const server = http.createServer(app);
// const io = socketIo(server)
// const corsOptions = {
//     origin: process.env.FRONTEND_URL,   // Allow requests from your Vite app
//     methods: ["GET", "POST","PUT","DELETE"],
//     allowedHeaders: ['Content-Type', 'Authorization'],
   
   
// };

app.use(cors()); // Use CORS middleware before your routes
app.use(express.json());  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routes
app.use('/api/user',authRoutes);
app.use('/api/plants',plantRoutes);
app.use('/api/user',getPlantsByCustomerRoute)
app.use('/api/inverters',inverterRoutes);
app.use('/api/get-plant-detail',getPlantDetailRoute);
app.use('/api/inverter',inverterDataRoutes);
app.use('/api/sensors',sensorDataRoutes);
app.use('/api/admin',adminNotificationRoutes);
app.use('/api/admin',userPlantRoutes);

// app.use('/api/user',adminNotificationRoutes);


// Error handling middlewares
app.get('/',(req,res)=>{
    res.status(200).json({
        status:'success',
        message:'Welcome to Green Energy'
    })
})
initSocket(server);

server.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
  
})


// new ssl code 
// const express = require("express");
// const dotenv = require("dotenv");
// const { validateAndSendVerificationEmail } = require('./middlewares/errorHandler');
// const authRoutes = require("./routes/userRoutes");
// const plantRoutes = require('./routes/create-plant-route');
// const inverterRoutes = require('./routes/create-inverter-route');
// const getPlantsByCustomerRoute = require('./routes/get-plant-by-user');
// const getPlantDetailRoute = require('./routes/get-plant-detail-route');
// const inverterDataRoutes = require('./routes/send-inverter-data-routes');
// const sensorDataRoutes = require('./routes/send-sensor-data-route');
// const adminNotificationRoutes = require('./routes/send-notification-admin-route');
// const userPlantRoutes = require('./routes/user-plant-route');
// const socketIo = require('socket.io');
// const cors = require('cors');
// const https = require('https');
// const fs = require('fs');
// const bodyParser = require("body-parser");
// dotenv.config();
// const { initSocket } = require('./utils/socket');
// const dbConnect = require("./config/dbConnect");
// const app = express();
// dbConnect();

// const PORT = process.env.PORT || 5000;

// // SSL certificates (provide the correct paths)
// const sslOptions = {
//     key: fs.readFileSync('key.pem'),
//     cert: fs.readFileSync('cert.pem'),
//     // ca: fs.readFileSync('path/to/your/ca-certificate.pem') // Optional, depending on the setup
// };

// // Create HTTPS server with SSL certificates
// const server = https.createServer(sslOptions, app);

// // Enable CORS for your frontend application (e.g., Vite app running on specific address)
// const corsOptions = {
//     origin: 'http://192.168.1.238:5173',  // Adjust the frontend URL
//     methods: ["GET", "POST"],
//     allowedHeaders: ['Content-Type', 'Authorization'],
// };

// app.use(cors(corsOptions)); // Use CORS middleware before your routes
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// // Define routes
// app.use('/api/user', authRoutes);
// app.use('/api/plants', plantRoutes);
// app.use('/api/user', getPlantsByCustomerRoute);
// app.use('/api/inverters', inverterRoutes);
// app.use('/api/get-plant-detail', getPlantDetailRoute);
// app.use('/api/inverter', inverterDataRoutes);
// app.use('/api/sensors', sensorDataRoutes);
// app.use('/api/admin', adminNotificationRoutes);
// app.use('/api/admin', userPlantRoutes);

// // Initialize Socket.IO (use the server created with HTTPS)
// initSocket(server);

// // Start the server
// server.listen(PORT, () => {
//     console.log(`Server running on port ${PORT} (HTTPS)`);
// });
