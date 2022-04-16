const express = require("express");
const cors = require("cors");
const { getCompliment, getFortune, getQuote } = require("./controllers");
const {createPositive} = require("./positives");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune);
app.get("/api/quote", getQuote);
app.post("/api/form", createPositive);

app.listen(4000, () => console.log("Server running on 4000"));
