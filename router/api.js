const express = require("express");
const api = express.Router();
const data = require("../data/users.json");
const db = require("../node_db/db");

api.get("/posts", (req, res) => {
  res.json(data["users"]);
});
api.post("/task", (req, res) => {
  var task = req.body.task;
  var status = 0;

  db.query("INSERT INTO tasks set ?", { task: task, status: status }, function(
    err,
    ress
  ) {
    if (err) {
      res.status(500).json({ error: err });
      //result(err, null);
    } else {
      if (ress != null) {
        res.status(200).json({ message: "data saved successfully" });
      }

      // result(null, res.insertId);
    }
  });
});
api.get("/tasks", (req, res) => {
  db.query("select * from tasks", function(err, ress) {
    if (err) {
      res.json({ message: err });
      //result(err, null);
    } else {
      if (ress != null) {
        res.json({ message: ress });
      }

      // result(null, res.insertId);
    }
  });
});
api.get("/delete/:id", (req, res) => {
  var id = req.params.id;
  db.query("delete from tasks where tasks.id=?", id, function(err, ress) {
    if (err) {
      res.json({ message: err });
      //result(err, null);
    } else {
      if (ress != null) {
        res.json({ message: ress });
      }

      // result(null, res.insertId);
    }
  });
});
module.exports = api;
