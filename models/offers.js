const { Schema, model } = require("mongoose");

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
      default: new Date(),
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    userId: {
      type: String,
      required: true,
    },
    Reply: {
      type: String,
    },
   status:{
     type:String,
     enum: ['accepted', 'rejected', 'pending'],
     default:"pending"
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
