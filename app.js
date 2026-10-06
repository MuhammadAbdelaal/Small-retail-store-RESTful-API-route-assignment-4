const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json()); // parse json requests

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
