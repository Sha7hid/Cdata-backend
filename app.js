require('dotenv').config();

const { createAgent } = require('@forestadmin/agent');
const { createMongooseDataSource } = require('@forestadmin/datasource-mongoose');
// Retrieve your mongoose connection
const connection = require('./config/db');

// Create your Forest Admin agent
// This must be called BEFORE all other middleware on the app
createAgent({
  authSecret: process.env.FOREST_AUTH_SECRET,
  envSecret: process.env.FOREST_ENV_SECRET,
  isProduction: process.env.NODE_ENV === 'production',
  
})
  // Create your Mongoose datasource
  .addDataSource(createMongooseDataSource(connection))
  // Replace "myExpressApp" by your Express application
  const myExpressApp = `cdata-backend-production-b82b.up.railway.app`
  .mountOnExpress(myExpressApp)
  .start();
const express = require('express');
const bodyParser = require('body-parser');



const app = express();
app.use(bodyParser.json());

const connectDB = require('./config/db');

const mongo_uri =`mongodb+srv://shahid:arthur540913@cluster2.ggcnvuy.mongodb.net/cdata`

connectDB();
const port = process.env.PORT || 3000
console.log({port});
// Routes
app.use('/api/students', require('./routes/student'));
app.use('/api/teachers', require('./routes/teacher'));
app.use('/api/announcements', require('./routes/announcements'));
app.listen(port);