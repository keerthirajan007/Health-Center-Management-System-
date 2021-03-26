const express = require("express");
const mongo = require("./index");
const app = express();
const path = require("path");
const hbs = require("hbs");

app.get("", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/get_id/:id", async (req, res) => {
  let roll_no = parseInt(req.params.id);
  await mongo.getProfileId(roll_no, (e, r) => {
    res.send(r);
  });
});

app.get("/get_image", (req, res) => {
  res.sendFile(path.join(__dirname, "/resources/Image1.jpg"));
});

app.get("/get_image1", (req, res) => {
  res.sendFile(path.join(__dirname, "/resources/19133748.jpg"));
});

app.get("/get_details/:id", async (req, res) => {
  let id = req.params.id;
  await mongo.getDetails(id, (e, r) => {
    res.json(r);
  });
});

app.get("/create_user/:roll_no/:data", async (req, res) => {
  let roll_no = parseInt(req.params.roll_no);
  await mongo.createUser(roll_no, JSON.parse(req.params.data), (e, r) => {
    res.json(r);
  });
});

app.get("/modify_user/:roll_no/:data", async (req, res) => {
  let roll_no = parseInt(req.params.roll_no);
  mongo.getProfileId(roll_no, (err, id) => {
    mongo.modifyUserById(id, JSON.parse(req.params.data), (e, r) => {
      res.json(r);
    });
  });
});

app.get("/modify_user_id/:id/:data", async (req, res) => {
  let id = req.params.id;
  await mongo.modifyUserById(id, JSON.parse(req.params.data), (e, r) => {
    res.json(r);
  });
});

app.listen(3000, () => {
  console.log("server is on the port 3000");
});
