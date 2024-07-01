const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
    },
    name: {
      type: String,
    },
    affiliation: {
      type: String,
    },
    department: {
      type: String,
    },
    course: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    lastAccess: {
      type: Date,
      default: Date.now,
    },
    avatar: {
      type: String,
      default: "https://www.gravatar.com/avatar/?d=mp",
    },
    favorites: {
      type: [String]
    },
    role: {
      type: String,
      enum: ["admin", "student", "teacher"],
      default: "student",
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  if (!this.avatar) {
    this.avatar = `https://www.gravatar.com/avatar/?d=mp`;
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
