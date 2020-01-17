const express = require('express');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan')

const app = express();

//Logging middleware
/**
 * 
  app.use(function(request, response, next) {
    console.log(`Request IP: ${request.ip} ${request.url}`);
    console.log(`Request date: ${new Date()}`);
    next();
  });
 */
app.use(morgan("short"))

//Middleware to serve file if file exists
app.use(function(request, response, next) {
  var filePath = path.join(__dirname, "static", request.url)
  fs.stat(filePath, function(err, fileInfo) {
    if (err) {
      next();
      return;
    }
    if (fileInfo.isFile()) {
      response.sendFile(filePath);
    } else {
      next();
    }
  });
});

//404 Middleware
app.use(function(request, response) {
  response.status(404);
  response.send("File not found")
})

app.listen(3000, function() {
  console.log("App started on port 3000");
});