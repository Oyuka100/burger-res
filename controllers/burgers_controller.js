var express = require("express");
// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");
var router = express.Router();

// router connections

// get router
router.get("/", function(req, res) {
    burger.selectAll(function(data) {
        var hbsObj = {
            burgers: data
        };
        console.log(hbsObj);
        res.render("index", hbsObj);
    });

// post router
router.post("/api/burgers", function(req, res) {
    burger.insertOne(
        ["burger_name", "devoured"],
        [req.body.burger_name, req.body.devoured],
        function(result) {
            // send back ID of new burger
            res.json({ id: result.insertId });
        }
      );
    });

// put router
router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);
    burger.updateOne({ devoured: req.body.devoured }, condition, function(
      result
    ) {
      if (result.changedRows === 0) {
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });

// delete router
router.delete("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    console.log("condition", condition);

    burger.deleteOne(condition, function(result) {
        if (result.changedRows === 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
      });
    });
});

// Export routes for server.js to use.
module.exports = router;