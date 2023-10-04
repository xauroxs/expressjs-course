const express = require("express");
const path = require("path");

const router = express.Router();

// root route
router.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

// a non-root page
router.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "new-page.html"));
});

// a redirect
router.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page.html");
});

// 1st variant of chaining functions together
router.get(
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

router.get("/chain(.html)?", [one, two, three]);

module.exports = router;
