const express = require('express');
const cors = require('cors');
const app = express();

const userRoutes = require('./routes/userRoutes');

const { connect, sequelize } = require('./db');
const User = require('./model/User');

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);

const PORT = 3010;

const start = async () => {
  await connect();

  await sequelize.sync({ alter: true }); 

  app.listen(PORT, () => {
    console.log(`Serverul rulează pe http://localhost:${PORT}`);
  });
};

start();
