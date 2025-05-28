const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
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
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "adventure",
        "cultural",
        "relaxation",
        "sightseeing",
        "food",
        "shopping",
        "entertainment",
        "nature",
        "other",
      ],
    },
    subCategory: {
      type: String,
      trim: true,
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
        enum: ["per_person", "per_group", "fixed"],
        default: "per_person",
      },
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        caption: String,
        isMain: {
          type: Boolean,
          default: false,
        },
      },
    ],
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
      address: {
        street: String,
        city: String,
        state: String,
        country: String,
        postalCode: String,
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
        minDays: Number,
        maxDays: Number,
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
    requirements: {
      minAge: Number,
      maxAge: Number,
      fitnessLevel: {
        type: String,
        enum: ["easy", "moderate", "challenging", "difficult"],
      },
      specialRequirements: [String],
    },
    provider: {
      name: String,
      contact: {
        email: String,
        phone: String,
        website: String,
      },
    },
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

// Indexes for efficient querying
activitySchema.index({ location: "2dsphere" });
activitySchema.index({ destination: 1, category: 1 });
activitySchema.index({
  "availability.startDate": 1,
  "availability.endDate": 1,
});

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
