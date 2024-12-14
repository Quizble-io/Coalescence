import dotenv from "dotenv";
import express from 'express'
const endpointController = require("./controllers/controller")
const cors = require('cors')

dotenv.config();

const app = express(); 
app.use(cors());
const port = process.env.PORT

app.use(express.json())

app.use("/", endpointController)
app.get("/", (req, res) => {
    res.send("somehwer")
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})