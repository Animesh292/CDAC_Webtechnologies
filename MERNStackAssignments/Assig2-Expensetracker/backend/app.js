require("dotenv").config();
const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 3000

const app = express();

//middleware for parsing json and form content body
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const homeRoute = require("./routes/home");
app.use(cors({ origin: `http://localhost:5173` }));
app.use('/api', homeRoute);

app.listen(PORT, () => {
    console.log(`Server has started on PORT ${PORT}`)
})