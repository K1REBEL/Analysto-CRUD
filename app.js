require("dotenv").config();

const { connectToMySQL } = require("./DB/connect");
connectToMySQL()

const express = require("express");
const app = express();
app.use(express.json());
const port = 4000;

app.get("/", (req, res) => res.send("Hello Analysto!"));

const authRouter = require("./modules/auth.router");
app.use("/auth", authRouter);

app.listen(port, "0.0.0.0", () => console.log("Server is running on port " + port));