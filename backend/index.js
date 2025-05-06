require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const enrollRoutes = require('./routes/enrollRoutes');
const discountRoutes = require('./routes/discountRoutes');
const ollamaRoutes = require('./routes/ollamaRoutes');

const { connect, sequelize } = require('./db');
const {User, Course, Enroll, Discount} = require('./model');

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrolls', enrollRoutes);
app.use('/api/discounts', discountRoutes);
app.use('/api/ollama', ollamaRoutes);

const PORT = process.env.PORT

const start = async () => {
  await connect();

  await sequelize.sync({ alter: true }); 

  app.listen(PORT, () => {
    console.log(`Serverul rulează pe http://localhost:${PORT}`);
  });
};

start();
