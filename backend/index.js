const express = require('express');
const cors = require('cors');
const app = express();

const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const enrollRoutes = require('./routes/enrollRoutes');

const { connect, sequelize } = require('./db');
const {User, Course, Enroll} = require('./model');

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrolls', enrollRoutes);

const PORT = 3010;

const start = async () => {
  await connect();

  await sequelize.sync({ alter: true }); 

  app.listen(PORT, () => {
    console.log(`Serverul rulează pe http://localhost:${PORT}`);
  });
};

start();
