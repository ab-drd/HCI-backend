const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');

const https = require('https');
const http = require('http');

const fs = require('fs');

const app = express();
app.use(cors());
app.options('*', cors()) // include before other routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const port = 3000;
const usersRouter = require("./routes/users");
const commentsRouter = require("./routes/comments");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*'); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
app.use("/users", usersRouter);
app.use("/comments", commentsRouter);
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});

const httpsServer = https.createServer({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
}, app);

httpsServer.listen(443, () => {
  console.log('HTTPS Server running on port 443');
});