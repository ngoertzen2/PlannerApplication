require("dotenv").config()

const express = require("express")
const cors = require("cors")
const { Pool } = require("pg")

const app = express()
app.use(cors())
app.use(express.json())

app.get("/test", (req, res) => {
  res.json({ message: "Backend working" })
})

app.listen(5000, () => {
  console.log("Server running on port 5000")
})