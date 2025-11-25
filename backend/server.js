const express = require('express');
const cors = require('cors');
require('dotenv').config();

const routes = require('./routes');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Task Management Backend is running...');
});

app.use('/api', routes);

// Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
