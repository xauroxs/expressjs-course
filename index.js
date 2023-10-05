const express = require("express");
const path = require("path");
const cors = require("cors");

const corsOptions = require("./config/cors-options");

const rootRouter = require("./routes/root");
const subdirRouter = require("./routes/subdir");

const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const port = process.env.PORT || 3000;

// applying custom middleware - logger
app.use(logger);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// applying middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/subdir", express.static(path.join(__dirname, "public")));

// express router
app.use("/", rootRouter);
app.use("/subdir", subdirRouter);

// every route that is not supported
app.all("*", (req, res) => {
  res.status(404);

  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

// write all errors to errLog file
app.use(errorHandler);

app.listen(port, () => console.log(`Express app is running on port ${port}`));
