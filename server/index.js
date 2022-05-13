const express = require("express");
const cors = require("cors");
const path = require('path');
const cookieParser = require("cookie-parser");
const session = require('express-session');
const dotenv = require('dotenv').config();
const secret = process.env.SECRET;

const { getCompliment, getFortune, getQuote } = require("./controllers");
const {createPositive, deletePositive, getPositives, updatePositive} = require("./positives");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
    secret: secret,
    saveUninitialized:true,
    resave: false,
    cookie: { maxAge: 6000 }
}))
app.use("/styles", express.static(path.join(__dirname,"../public/styles.css")));
app.use("/frontend", express.static(path.join(__dirname,"../public/main.js")));

app.get('/', (req, res) => {
    // req.session.destroy();
    res.sendFile(path.join(__dirname, '../public/index.html'))
})
// app.get("/reset", (req,res) => {
//     req.session.destroy();
//     res.status(200);
// })
app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune);
app.get("/api/quote", getQuote);
app.get("/api/", getPositives);
app.post("/api/form", createPositive);
app.delete("/api/formDelete/:id", deletePositive);
app.put("/api/updatePositive/:id", updatePositive)

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server rocking out on ${port}`)
})

