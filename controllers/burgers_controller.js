const express = require("express");
const router = express.Router();
const burger = require("../models/burger");

// ROUTES
// --------------------
// Get route
router.get("/", function(req, res) {
  burger.selectAll(function(data) {
    const hbsObject = {
      burgers: data
    };
    res.render("index", hbsObject);
  })
});

// Post route -> Create a new burger using the data posted from the front-end.
router.post("/api/burgers", function(req, res) {
  burger.insertOne(
    req.body.burger_name, 
    function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

// Update a burger to devoured by id
router.put("/api/burgers/:id", function(req, res) {
  const condition = req.params.id;

  burger.updateOne(
    req.body.devoured, condition, 
    function(result) {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
  });
});

module.exports = router;