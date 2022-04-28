const express = require("express");
const cors = require("cors");
const { getCompliment, getFortune, getQuote } = require("./controllers");
const {createPositive, deletePositive, getPositives, updatePositive} = require("./positives");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"))

app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune);
app.get("/api/quote", getQuote);
app.get("/api/", getPositives);
app.post("/api/form", createPositive);
app.delete("/api/formDelete/:id", deletePositive);
app.put("/api/updatePositive/:id", updatePositive)

app.listen(4000, () => console.log("Server running on 4000"));
