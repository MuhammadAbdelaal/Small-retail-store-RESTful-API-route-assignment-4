const express = require("express");
const mysql = require("mysql2/promise");
const app = express();
const PORT = 3000;

app.use(express.json()); // parse json requests

// mysql connection pool
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "retail_store",
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
