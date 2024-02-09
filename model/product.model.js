const mongoose = require("mongoose");

/**
 id (unique identifier)
name (string, 1-50 characters)
picture (string, URL)
description (string)
gender ("male" and "female" as options)
category ("makeup", "skincare" and "haircare" as options)
price (number)
created_at (timestamp, automatically set when product is created)
updated_at (timestamp, automatically updated when product is updated)
 */

const postSchema = mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, maxlength: 100 },
  category: { type: String, enum: ['Development', 'Design', 'Innovation', 'Tutorial','Business'] },
  content: { type: String },
  media: [{ type: String }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ 
      user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      text: { type: String },
      created_at: { type: Date, default: Date.now }
  }],
  created_at: { type: Date, default: Date.now }
},{
  versionKey:false
});

const ProductModel = mongoose.model("product", postSchema);

module.exports = {
  ProductModel,
};
