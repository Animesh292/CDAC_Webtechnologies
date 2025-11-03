require("dotenv").config();
const express = require("express");
const db = require("./db/db.js");
const cors = require("cors");
//routes 
const homeRoute = require("./routes/homePage.js");
const app = express();

const PORT = process.env.PORT || 3000;


//middlewares
app.use(express.json());//for parsing JSON objects
app.use(express.urlencoded({extended: true})); //for parsing form data
app.use(cors({ origin: 'http://localhost:5173' }));


app.use('/api', homeRoute);

app.listen(PORT, () => { //we're telling our app to listen on this port number
    console.log(`Server has started on PORT ${PORT}`)
})