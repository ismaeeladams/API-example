const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");

//Get all Categories
router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM categories", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

// Gets one Category
router.get("/:id", (req, res) => {
  try {
    con.query(
      `SELECT * FROM categories WHERE category_id = ${req.params.id}`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Add new Categories
router.post("/", (req, res) => {
  const { name, description, thumbnail } = req.body;
  try {
    con.query(
      `INSERT INTO categories (
            name,
            description,
            thumbnail)
            VALUES ("${name}", "${description}", "${thumbnail}")`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Delete one Categories
router.delete("/:id", (req, res) => {
  try {
    con.query(
      `DELETE FROM categories WHERE category_id = ${req.params.id}`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Edit Users by ID
router.put("/:id", (req, res) => {
  const { name, description, thumbnail } = req.body;
  try {
    con.query(
      `UPDATE categories SET name = "${name}", description = "${description}",thumbnail = "${thumbnail}" WHERE category_id = "${req.params.id}" `,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
