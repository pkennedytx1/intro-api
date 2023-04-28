const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 8080;

app.use(bodyParser.json())

app.get("/", (req, res, next) => {
    res.json("Howdy hey from out API!🤠")
})

app.post("/", (req, res, next) => {
    const data = req.body;
    data.progress = "In Progress";
    res.json(data)
})

app.listen(PORT, () => {
    console.log(`🔥🔥🔥 Server running on port ${PORT} 🔥🔥🔥`);
})