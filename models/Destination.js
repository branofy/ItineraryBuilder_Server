const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
      maxlength: 200,
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
    },
    timeZone: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    languages: [
      {
        type: String,
        trim: true,
      },
    ],
    bestTimeToVisit: {
      startMonth: Number,
      endMonth: Number,
      description: String,
    },
    weather: {
      averageTemperature: {
        summer: Number,
        winter: Number,
      },
      rainfall: {
        summer: Number,
        winter: Number,
      },
    },
    attractions: [
      {
        name: String,
        description: String,
        type: {
          type: String,
          enum: ["landmark", "museum", "park", "beach", "mountain", "other"],
        },
        location: {
          type: {
            type: String,
            enum: ["Point"],
            default: "Point",
          },
          coordinates: [Number],
        },
      },
    ],
    transportation: {
      airports: [
        {
          name: String,
          code: String,
          distance: Number,
        },
      ],
      publicTransport: {
        type: String,
        enum: ["excellent", "good", "fair", "poor"],
      },
    },
    safety: {
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
      notes: String,
    },
    localCustoms: [
      {
        title: String,
        description: String,
      },
    ],
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
destinationSchema.index({ location: "2dsphere" });
destinationSchema.index({ country: 1, city: 1 });
destinationSchema.index({ name: "text", description: "text" });

const Destination = mongoose.model("Destination", destinationSchema);

module.exports = Destination;
