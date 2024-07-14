const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const apiRoutes = require("./routes");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.send("Welcome to Todoist Application..");
});

app.use("/api", apiRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is up and running on PORT: ${process.env.PORT}`);
});
