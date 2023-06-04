var express = require("express");
const eventCategoryModel = require("./event-category.model");
const { ObjectId } = require("mongodb");
const { default: mongoose } = require("mongoose");

// list eventCategories
exports.listData = async (req, res, next) => {
  try {
    const list = await eventCategoryModel.find();
    res.json(list);
  } catch (error) {
    res.json("error", {
      eventCategory: error.eventCategory,
      error: error,
    });
  }
};

// get event category by _id
exports.getData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const eventCategory = await eventCategoryModel.findOne({ _id: id });
    res.json(eventCategory);
  } catch (error) {
    res.json("error", {
      eventCategory: error.eventCategory,
      error: error,
    });
  }
};

// get event category by eventCategoryName
exports.getDataByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const eventCategory = await eventCategoryModel.findOne({
      eventCategoryName: name,
    });
    res.json(eventCategory);
  } catch (error) {
    res.json("error", {
      eventCategory: error.eventCategory,
      error: error,
    });
  }
};

// create eventCategory
exports.addData = async (req, res, next) => {
  try {
    const { eventCategoryName, eventCategoryDescription, createdBy } = req.body;
    const existingEventCategory = await eventCategoryModel.findOne({
      eventCategoryName,
    });
    if (existingEventCategory) {
      res.status(500).json({ error: "CONFLICT" });
    } else {
      const eventCategory = new eventCategoryModel({
        eventCategoryName: eventCategoryName,
        eventCategoryDescription: eventCategoryDescription,
        createdBy: createdBy,
      });
      eventCategory.save();
      res.json("added successfully");
    }
  } catch (error) {
    res.status(500).json({ error: "Some error message" });
  }
};

exports.updateData = async function (req, res, next) {
  try {
    const { id } = req.params;
    const { eventCategoryName, eventCategoryDescription } = req.body;
    // if (!mongoose.isValidObjectId(id)) {
    //   return res.status(400).json({ error: "Invalid ID format" });
    // }
    const existingEventCategoryy = await eventCategoryModel.findOne({
      eventCategoryName,
    });
    const obj = new ObjectId(id);
    console.log(existingEventCategoryy._id.toString());
    console.log(obj);

    const existingEventCategory = await eventCategoryModel.findOne({
      eventCategoryName,
      _id: { $ne: obj },
    });
    if (existingEventCategory) {
      res.status(409).json({ error: "CONFLICT" });
    }
    const updatedEventCategory = {
      eventCategoryName: eventCategoryName,
      eventCategoryDescription: eventCategoryDescription,
    };
    const eventCategory = await eventCategoryModel.findByIdAndUpdate(id, {
      $set: updatedEventCategory,
    });
    res.json(await eventCategoryModel.findById({ id }));
    if (!eventCategory) {
      res.status(500).json({ error: "Error while updating event category" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

