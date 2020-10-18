const express = require('express');
const dashboards = express.Router();
const DashboardController = require('./../controller/DashboardController');

dashboards.post('/admin-dashboard',DashboardController.getAdminDashboardData);

module.exports = dashboards;