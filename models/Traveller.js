const mongoose = require("mongoose");

const travellerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["adult", "child", "infant"],
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    passportNumber: {
      type: String,
      required: true,
      unique: true,
    },
    passportExpiryDate: {
      type: Date,
      required: true,
    },
    specialRequirements: {
      dietary: [String],
      medical: [String],
      accessibility: [String],
      other: [String],
    },
    contactInfo: {
      email: String,
      phone: String,
      emergencyContact: {
        name: String,
        relationship: String,
        phone: String,
      },
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

const Traveller = mongoose.model("Traveller", travellerSchema);

module.exports = Traveller;
