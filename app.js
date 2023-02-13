const { request, response } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./Routes");
require("dotenv").config();
const app = express();
app.use(cors());
const PORT = process.env.PORT || 5500;
app.use(express.json());
app.use(router)
const DBURI =
"mongodb+srv://admin:admin@cluster0.vaqe8lu.mongodb.net/Plantify"
mongoose
  .connect(DBURI)
  .then((res) => console.log("DB Connected"))
  .catch((err) => console.log("DB error", err));



app.listen(PORT, () =>
  console.log(`Server is success full running on : http://localhost${PORT}`)
);
