var express = require("express");
const mongoose = require("mongoose");
var router = express.Router();
const eventCategoryModel = require("./event-category.model");
const { listData, addData, updateData, getData, getDataByName, deleteData } = require("./event-category.service");

// list event categories
router.get("/list", listData);

// get event category by _id
router.get("/:id", getData);

// get event category by name
router.get("/name/:name", getDataByName);

// create event category
router.post("/add", addData);

// update event category
router.post("/update/:id", updateData);


module.exports = router;
