const express = require('express');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan')

const app = express();

//Logging middleware
app.use(morgan("short"));

//Middleware to serve file if file exists
const staticFilePath = path.join(__dirname, "static");
app.use(express.static(staticFilePath));

//404 Middleware
app.use(function(request, response) {
  response.status(404);
  response.send("File not found")
});

app.listen(3000, function() {
  console.log("App started on port 3000");
});