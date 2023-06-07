const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      match: [/.+\@.+\..+/],
    },
    password: {
      type: String,
      required: true,
    },

    aboutme: {
      type: String,
      trim: true,
    },

    profilepic: {
      type: String,
    },

    Github:{
      type: String,
    },

    LinkedIn:{
      type: String,
    },
    skillsKnown: [{}],

    skillsUnknown: [{}],

    offers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Offer",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

UserSchema.pre("save", function (next) {
  const user = this;

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }

          user.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});

UserSchema.virtual("knownskill").get(function () {
  return this.skillsKnown.length;
});
UserSchema.virtual("unknownskills").get(function () {
  return this.skillsUnknown.length;
});

const User = model("User", UserSchema);

module.exports = User;
