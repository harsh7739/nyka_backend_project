const mongoose = require("mongoose");

/*
id (unique identifier)
name (string, 1-50 characters)
avatar (string, URL)
email (string, valid email format)
password (string)
created_at (timestamp, automatically set when the user is created)
updated_at (timestamp, automatically updated when the user is updated)
*/
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
