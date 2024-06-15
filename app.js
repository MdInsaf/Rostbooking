const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const facilitiesRoutes = require('./routes/facilitiesRoutes'); 
const userRouter = require('./routes/user.router');
const roomRoutes = require('./routes/roomsRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const roomRatesRoutes = require('./routes/roomRatesRoutes');
const roomCategoryRoutes = require('./routes/roomCategoryRoutes');
const HotelService = require('./services/hotelService');
const HotelController = require('./controllers/hotelController');
const inventoryRoutes = require('./routes/inventoryRoutes');
const bulkInventoryRoutes = require('./routes/bulkInventoryRoutes');
const calendarRoutes = require('./routes/calendarRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const roomReservationRoutes = require('./routes/roomReservationRoutes');

const app = express();
const PORT = process.env.PORT || 8080; // Changed the port to 8080

// Middleware
app.use(bodyParser.json());

// MySQL connection
const dbConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB,
});

// Initialize hotel service and controller
const hotelService = new HotelService(dbConnection);
const hotelController = new HotelController(hotelService);

// Routes
// Facilities routes
app.use('/api/facilities', facilitiesRoutes);

// Room routes
app.use('/api/rooms', roomRoutes); 

// Room rates routes
app.use('/api/room-rates', roomRatesRoutes);

// Room category routes
app.use('/api', roomCategoryRoutes);

// Hotel routes
app.post('/api/hotel', (req, res) => {
  hotelController.createHotel(req, res);
});

app.get('/api/hotels', (req, res) => {
  hotelController.getHotels(req, res);
});

app.patch('/api/hotel/:id', (req, res) => {
  hotelController.updateHotel(req, res);
});

app.delete('/api/hotel/:id', (req, res) => {
  hotelController.deleteHotel(req, res);
});

// User routes
app.use('/api/users', userRouter);

// Reservation routes
app.use('/api/reservations', reservationRoutes);

// Inventory routes
app.use('/api/inventory', inventoryRoutes);
app.use('/api/bulk-inventory', bulkInventoryRoutes);

// Calendar routes
app.use('/api/calendar', calendarRoutes);

// Invoice routes
app.use('/api', invoiceRoutes);

// Room reservation routes
app.use('/api/roomreservations', roomReservationRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: 0,
    message: err.message || 'Internal Server Error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
