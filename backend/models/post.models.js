const mongoose = require("mongoose");

// structure de la DB
const postSchema = mongoose.Schema(
  {
    message: {
        type: String,
        required: true,
    },
    author: {
        type: String,
    },
    likers: {
        type: [String]
    },
  },
  {
    timestamps: true,
  }
);

// le nom c'est post et il vas porter la structure portschema
module.exports = mongoose.model('post', postSchema);