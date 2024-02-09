const mongoose = require("mongoose");


const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true, minlength: 3, maxlength: 30 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}
);

const UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel,
};
