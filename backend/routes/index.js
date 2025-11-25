const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const taskRoutes = require('./taskRoutes');

router.use('/users', userRoutes);          // Endpoints: /api/users/*
router.use('/dashboard', dashboardRoutes); // Endpoints: /api/dashboard/*
router.use('/tasks', taskRoutes);       // Endpoints: /api/tasks/*

module.exports = router;