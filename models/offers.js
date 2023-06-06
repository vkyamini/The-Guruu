const { Schema, model } = require("mongoose");

// add status to an offer
// 1. "Accepted"
// 2. "Rejected"
// 3. "In-Progress"
const offerSchema = new Schema(
  {
    Text: {
      type: String,
      required: true,
      minlength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

const Offer = model("Offer", offerSchema);

module.exports = Offer;
