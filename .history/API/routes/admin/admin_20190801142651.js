const express = require("express");
const router = express.Router();
const passport = require('passport');
require('../../config/passport')(passport)
const adminControllers = require('../../controllers/admin/admin-auth/admin');
const staffAuthControllers = require('../../controllers/staff/staff-auth/staff-auth');
const staffCrudControllers = require('../../controllers/admin/staff-crud/staff-crud')
router.post('/register', adminControllers.REGISTER_ADMIN);
router.post('/login', adminControllers.LOGIN_ADMIN);
router.post('/staff/register', staffAuthControllers.REGISTER_STAFF)
router.post('/staff/login', staffAuthControllers.LOGIN_STAFF)
router.patch('/staff/:staffId', staffCrudControllers.UPDATE_STAFF)
router.patch('/staff/:staffId', staffCrudControllers.REMOVE_STAFF)


module.exports = router