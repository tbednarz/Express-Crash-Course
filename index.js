const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");
const exphbs = require("express-handlebars");
const members = require("./Members");

//init express
const app = express();

//init middleware
// app.use(logger);

//handlebars middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//init Body Parser middleware
//allows to handle raw json
app.use(express.json());
//allows form submissions extended: false to handle url encoded
app.use(express.urlencoded({ extended: false }));
//home page
app.get("/", (req, res) => {
  res.render("index", {
    title: "Members App",
    members,
  });
});

//Set a static folder

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/members", require("./routes/api/members"));
const PORT = process.env.PORT || 3000;
//listen on a port
app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});
