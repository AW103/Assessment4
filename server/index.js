const express = require("express");
const cors = require("cors");
const path = require('path')

const { getCompliment, getFortune, getQuote } = require("./controllers");
const {createPositive, deletePositive, getPositives, updatePositive} = require("./positives");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'))
})
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

