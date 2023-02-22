require('dotenv').config();

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