const express = require("express");

const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// applying middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

// root route
app.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// a non-root page
app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

// a redirect
app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page.html");
});

// 1st variant of chaining functions together
app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("Attempted to load hello.html");

    next();
  },
  (req, res) => {
    res.send("Hello, World!");
  }
);

// 2nd variant of chaining functions together
const one = (req, res, next) => {
  console.log("One");
  next();
};

const two = (req, res, next) => {
  console.log("Two");
  next();
};

const three = (req, res) => {
  console.log("Three");

  res.send("Finished!");
};

app.get("/chain(.html)?", [one, two, three]);

// every route that is not supported
app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(port, () => console.log(`Express app is running on port ${port}`));
