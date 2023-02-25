const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
  origin: ['localhost:3000', 'https://hclhr.vercel.app/']
}))
const port = 3000;
const usersRouter = require("./routes/users");
const commentsRouter = require("./routes/comments");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

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
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});