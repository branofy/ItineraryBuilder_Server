const Exclusion = require("../models/Exclusion");
const mongoose = require("mongoose");

//get all exclusions
const getExclusions = async (req, res) => {
  const exclusions = await Exclusion.find({}).sort({ createdAt: -1 })
  res.status(200).json(exclusions)
};

//get a single exclusion
const getExclusion = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such exclusion" });
  }

  const exclusion = await Exclusion.findById(id);

  if (!exclusion) {
    return res.status(404).json({ error: "No such exclusion" });
  }

  res.status(200).json(exclusion);
};

//create a new exclusion
const createExclusion = async (req, res) => {
  const { name, description, type, relatedItem, isActive } = req.body;

  //add doc to db

  try {
    const exclusion = await Exclusion.create({
      name,
      description,
      type,
      relatedItem,
      isActive,
    });
    res.status(200).json(exclusion);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

//delete an exclusion
const deleteExclusion = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such exclusion" });
  }

  const exclusion = await Exclusion.findOneAndDelete({ _id: id });

  if (!exclusion) {
    return res.status(404).json({ error: "No such exclusion" });
  }
  res.status(200).json(exclusion);
}

//update an exclusion
const updateExclusion = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such exclusion" });
  }

  const exclusion = await Exclusion.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!exclusion) {
    return res.status(400).json({ error: "No such exclusion" });
  }
  res.status(200).json(exclusion);
};

module.exports = {
  getExclusions,
  getExclusion,
  createExclusion,
  deleteExclusion,
  updateExclusion,
};
