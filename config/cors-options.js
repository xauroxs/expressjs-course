const whitelist = ["https://www.google.com"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Denied by CORS"));
    }
  },
};

module.exports = corsOptions;
