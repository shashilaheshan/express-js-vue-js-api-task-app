const express = require("express");
const api = express.Router();
const data = require("../data/users.json");
const db = require("../node_db/db");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
api.post("/sendmail", async (req, res) => {
  var email = req.body.email;
  var body = req.body.body;

  if (email != null && body != null) {
    const msg = {
      to: email,
      from: "ebayshashila@gmail.com",
      subject: "Sending with SendGrid is Fun",
      text: body,
      html: "<strong>" + body + "</strong>"
    };
    var ress = await sgMail.send(msg);

    res.status(200).json({ status: ress });
  } else {
    res.status(500).json({
      message: "Error occurred"
    });
  }
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
