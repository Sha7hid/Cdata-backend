const express = require('express');
const bodyParser = require('body-parser');



const app = express();
app.use(bodyParser.json());

const connectDB = require('./config/db');

const mongo_uri =`mongodb+srv://shahid:arthur540913@cluster2.ggcnvuy.mongodb.net/Blog`

connectDB();
const port = process.env.PORT || 3000
console.log({port});
// Routes
app.use('/api', require('./routes/student'));
app.listen(port);