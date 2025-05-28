const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    destinations: [
      {
        destination: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Destination",
          required: true,
        },
        startDate: Date,
        endDate: Date,
        order: Number,
      },
    ],
    budget: {
      amount: Number,
      currency: {
        type: String,
        default: "USD",
      },
    },
    travelers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Traveller",
      },
    ],
    isPublic: {
      type: Boolean,
      default: false,
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

const Itinerary = mongoose.model("Itinerary", itinerarySchema);

module.exports = Itinerary;
