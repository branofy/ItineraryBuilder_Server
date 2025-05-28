const mongoose = require("mongoose");

const dayPlanSchema = new mongoose.Schema(
  {
    itinerary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Itinerary",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      required: true,
    },
    activities: [
      {
        activity: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Activity",
        },
        startTime: Date,
        endTime: Date,
        order: Number,
        notes: String,
      },
    ],
    transfers: [
      {
        transfer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Transfer",
        },
        startTime: Date,
        endTime: Date,
        order: Number,
        notes: String,
      },
    ],
    accommodations: [
      {
        name: String,
        checkIn: Date,
        checkOut: Date,
        bookingReference: String,
        notes: String,
      },
    ],
    meals: [
      {
        type: {
          type: String,
          enum: ["breakfast", "lunch", "dinner", "snack"],
          required: true,
        },
        time: Date,
        location: String,
        notes: String,
      },
    ],
    notes: String,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient querying
dayPlanSchema.index({ itinerary: 1, date: 1 });

const DayPlan = mongoose.model("DayPlan", dayPlanSchema);

module.exports = DayPlan;
