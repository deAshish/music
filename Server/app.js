const express = require("express");
const musicRouter = require("./routers/musicRouter");
const userRouter = require("./routers/userRouter");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3000, () => console.log("listening to 3000..."));

app.use("/users", userRouter);
app.use("/musics", musicRouter);

app.use((req, res, next) => {
  res.status(404).json({ error: req.url + " API not supported!" });
});

app.use((err, req, res, next) => {
  if (err.message === "NOT Found") {
    res.status(404).json({ error: err.message });
  } else {
    res.status(500).json({ error: "Something is wrong! Try later" });
  }
});
