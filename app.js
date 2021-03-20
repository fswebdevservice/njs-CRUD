/*
 * include all required module
 * express ->  npm i express
 * esj -> npm i ejs
 * body-parser -> npm i body-parser
 * fs -> build in module. N.B. don't need to install
 * path -> build in module. N.B. don't need to install
 * bootstrap -> npm i bootstrap
 */
const express = require("express");
const app = express();
const connection = require("./db");
let path = require("path");
let fs = require("fs");
app.set("view engine", "ejs");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//static file for css/stylesheet/bootstrap
app.use(
  "/dist",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/"))
);

//render home page with mysql data, users and send to index.ejs file for render the data as a table
app.get("/", (req, res) => {
  connection.query(
    "select * from users order by id desc",
    (err, data, filed) => {
      if (!err) {
        res.render("index", { userData: data });
      } else {
        console.log("query filed");
      }
    }
  );
});

//add user
app.get("/add", (req, res) => {
  res.render("insert");
});
app.post("/add", (req, res) => {
  let { name, email, password } = req.body;
  let qs = [name, email, password];
  connection.query(
    "insert into users (name,email,password) values (?,?,?)",
    qs,
    (err, result, filed) => {
      if (!err) {
        console.log("add successfully..");
      } else {
        console.log("add failed!");
      }
    }
  );
  res.redirect("/");
});

//edit user
app.get("/edit/:id", (req, res) => {
  const id = req.params.id;

  let qs = id;
  connection.query(
    "select * from users where id=?",
    qs,
    (err, data, failed) => {
      if (!err) {
        res.render("edit", { data: data });
      } else {
        console.log(err.message);
      }
    }
  );
});

app.post("/", (req, res) => {
  const { name, email, password, id } = req.body;
  let qs = [name, email, password, id];
  connection.query(
    "update users set name=? , email=? , password=? where id=?",
    qs,
    (err, result, filed) => {
      if (!err) {
        console.log("Updated");
        res.redirect("/");
      } else {
        console.log("Not Updated");
      }
    }
  );
});

//delete user
app.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  let qs = id;
  connection.query(
    "delete from users where id=?",
    qs,
    (err, result, failed) => {
      if (!err) {
        console.log("deleted");
      } else {
        console.log("not  deleted");
      }
    }
  );
  res.redirect("/");
});

//listen port 5839
app.listen(5839, () => {
  console.log("server is running");
});
