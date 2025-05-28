const mongoose = require("mongoose");

const transferSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["airport", "hotel", "station", "port", "attraction", "other"],
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    from: {
      location: {
        type: {
          type: String,
          enum: ["Point"],
          default: "Point",
        },
        coordinates: {
          type: [Number],
          required: true,
        },
      },
      name: {
        type: String,
        required: true,
      },
      address: {
        street: String,
        city: String,
        state: String,
        country: String,
        postalCode: String,
      },
      type: {
        type: String,
        enum: ["airport", "hotel", "station", "port", "attraction", "other"],
      },
    },
    to: {
      location: {
        type: {
          type: String,
          enum: ["Point"],
          default: "Point",
        },
        coordinates: {
          type: [Number],
          required: true,
        },
      },
      name: {
        type: String,
        required: true,
      },
      address: {
        street: String,
        city: String,
        state: String,
        country: String,
        postalCode: String,
      },
      type: {
        type: String,
        enum: ["airport", "hotel", "station", "port", "attraction", "other"],
      },
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "van", "bus", "train", "ferry", "private_jet", "other"],
    },
    vehicleDetails: {
      make: String,
      model: String,
      year: Number,
      capacity: Number,
      features: [String],
    },
    duration: {
      hours: {
        type: Number,
        required: true,
      },
      minutes: {
        type: Number,
        default: 0,
      },
    },
    price: {
      amount: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        required: true,
      },
      priceType: {
        type: String,
        enum: ["per_person", "per_vehicle", "fixed"],
        default: "per_vehicle",
      },
    },
    availability: {
      startDate: Date,
      endDate: Date,
      maxCapacity: Number,
      currentBookings: {
        type: Number,
        default: 0,
      },
      bookingWindow: {
        minHours: Number,
        maxDays: Number,
      },
    },
    schedule: {
      departureTime: Date,
      arrivalTime: Date,
      frequency: {
        type: String,
        enum: ["one_time", "daily", "weekly", "custom"],
      },
      customSchedule: [
        {
          day: String,
          times: [String],
        },
      ],
    },
    provider: {
      name: String,
      contact: {
        email: String,
        phone: String,
        website: String,
      },
    },
    inclusions: [
      {
        type: String,
        trim: true,
      },
    ],
    exclusions: [
      {
        type: String,
        trim: true,
      },
    ],
    cancellationPolicy: {
      type: String,
      required: true,
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
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

// Indexes for geospatial queries
transferSchema.index({ "from.location": "2dsphere" });
transferSchema.index({ "to.location": "2dsphere" });
transferSchema.index({ type: 1, "from.type": 1, "to.type": 1 });
transferSchema.index({
  "availability.startDate": 1,
  "availability.endDate": 1,
});

const Transfer = mongoose.model("Transfer", transferSchema);

module.exports = Transfer;
