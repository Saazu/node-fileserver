const express = require('express');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan')

const app = express();

//Logging middleware
app.use(morgan("short"));
console.log("Error handling branch")

//Middleware to serve file if file exists
app.use(function (request, response, next) {
  const filePath = path.join(__dirname, "static", request.url)
  response.sendFile(filePath, function(err) {
    if (err) {
      next(new Error("Error sending file"));
    }
  })
})

//error handling middleware
app.use(function(err, request, response, next) {
  console.error(err);
  next(err);
})

app.use(function(err, request, response, next) {
  response.status(500);
  response.send("Internal server error");
})

//404 Middleware
app.use(function(request, response) {
  response.status(404);
  response.send("File not found");
})

app.listen(3000, function() {
  console.log("App started on port 3000");
});