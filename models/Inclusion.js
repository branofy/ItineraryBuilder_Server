const mongoose = require("mongoose");

const inclusionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["activity", "transfer", "accommodation", "meal", "other"],
    },
    relatedItem: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "type",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Inclusion = mongoose.model("Inclusion", inclusionSchema);

module.exports = Inclusion;
