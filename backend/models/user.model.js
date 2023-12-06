import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  _id: { type: String },
  avatar: { type: String },
  name: { type: String, require: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: Array, default: ["user"], required: true },
  bio: { type: String },
  isCertificate: { type: Boolean, default: false },
  category: { type: Array, default: [] },
  course_Ids: { type: Array, default: [] },
  total_course: { type: Number, default: 0 },
  review_Ids: { type: Array, default: [] },
  total_review: { type: Number, default: 0 },
  total_course_created: { type: Number, default: 0 },
  course_created_Ids: { type: Array, default: [] },
  total_review_created: { type: Number, default: 0 },
  review_created_Ids: { type: Array, default: [] },
  real_name: { type: String },
  cccd_number: { type: String },
  dateOfBirth: { type: String },
  createdAt: { type: String },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
  });
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const UserModel = mongoose.model("User", userSchema);
