require('dotenv').config()
const MONGO_URL = process.env.MONGO_URL
const mongoose = require('mongoose');
 


const connectToMongo =async ()=>{
    try {
        await mongoose.connect(MONGO_URL).then(()=>{
            console.log("Successfully connected to the database ")
        })
    } catch (error) {
        console.log(error);
        console.log("An error occured while connecting to the database ")
    }
}
 

module.exports = connectToMongo;