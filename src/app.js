const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// console.log(path.join(__dirname, '../public'));
// console.log(__filename);

// Define path for express config
const static = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../template/views");
const partialPath = path.join(__dirname, "../template/partials");

const app = express();

// Setup handlebars to express
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve content
app.use(express.static(static));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
    page: "Welcome",
    owner: "Amit"
  });
});

app.get("/weather", (req, res) => {
  const { address = "Delhi" } = req.query;
  if (!address) {
    return res.send({
      error: "Address field must be provided"
    });
  }
  geocode(address, (error, { latitude, longitude, location }) => {
    if (error) {
      return res.send({
        error
      });
    }
    forecast({ latitude, longitude }, (error, forecast) => {
      if (error) {
        return res.send({
          error
        });
      }
      res.send({
        forecast,
        location,
        address
      });
    });
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    page: "About Amit",
    owner: "Amit"
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "Error",
    message: "Help section not found"
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "Error",
    message: "404 page not found"
  });
});

app.listen(3000, () => {
  console.log("server is listening to port 3000");
});
