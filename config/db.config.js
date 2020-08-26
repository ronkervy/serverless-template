const mongoose = require('mongoose');

const opt = {
    useCreateIndex : true,
    useNewUrlParser :true,
    useUnifiedTopology : true,
    dbName : process.env.DB_NAME
};

mongoose.connect(process.env.URI,opt);

const db = mongoose.connection;

db.on("disconnected",()=>{
    console.log('Connection terminated.');
});

process.on('SIGINT',async() =>{
    await db.close();
    process.exit(0);
});

module.exports = db;