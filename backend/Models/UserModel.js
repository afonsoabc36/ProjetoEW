const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
      required: true,
      minlength: 2,
    },
    name: {
      type: String,
      minlength: 2,
    },
    affiliation: {
      type: String,
      minlength: 2,
    },
    department: {
      type: String,
      minlength: 2,
    },
    course: {
      type: String,
      minlength: 2,
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
    role: {
      type: String,
      enum: ["admin", "student", "teacher"],
      default: "student",
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
