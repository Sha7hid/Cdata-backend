const mongoose = require('mongoose');
const mongo_uri = `mongodb+srv://shahid:arthur540913@cluster2.ggcnvuy.mongodb.net/cdata`
mongoose.set('strictQuery', false)
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(mongo_uri,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`Mongo DB Connected: ${conn.connection.host}`)
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}


module.exports = connectDB;