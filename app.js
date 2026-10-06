const express = require("express");
const mysql = require("mysql2/promise");
const app = express();
const PORT = 3000;

app.use(express.json()); // parse json requests

// TODO: test db connection and delete
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "retail_store",
});

app.get("/test-db", async (req, res, next) => {
  try {
    const [result] = await db.query("SELECT 1 + 1 AS solution");
    res.status(200).json({
      message: "Database connection works.",
      result: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "DB connection failed.",
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
