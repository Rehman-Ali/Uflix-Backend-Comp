const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require('passport');
const usersRoutes = require('./API/routes/users/users');
const productRoutes = require('./API/routes/products');
const adminRoutes = require('./API/routes/admin/admin');
const moviesRoutes = require('./API/routes/movies/movies');
const staffRoutes = require('./API/routes/staff/staff');
const complaintRoutes = require('./API/routes/complaints/complaints');
const demandedMoviesRoutes = require('./API/routes/onDemandedMovies/onDemandedMovies')
const cors = require('cors');
// const shortid = require('shortid');
const app = express();
// Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//CORS
app.use(cors())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, PUT');
        return res.status(200).json({})
    }
    next()
})
// DB Config
const db = require("./API/config/keys").mongoURI;
// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./API/config/passport")(passport);
// Routes
app.use('/api/admin', adminRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/movies", moviesRoutes);
app.use("/api/products", productRoutes);
app.use("/api/staff", staffRoutes);
app.use('/api/users', complaintRoutes);
app.use('/api/users', demandedMoviesRoutes);
app.use('/uploads', express.static('uploads'))


module.exports = app