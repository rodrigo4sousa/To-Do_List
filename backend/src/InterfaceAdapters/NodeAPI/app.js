const express = require('express');
const cors = require('cors');
const taskRoutes = require('./Routes/Tasks');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/tasks', taskRoutes);

module.exports = app;