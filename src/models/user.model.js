"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG API
------------------------------------------------------- */

const mongoose = require("mongoose");

//Password Encrytion

// const crypto = require("node:crypto");

// const keyCode = process.env?.SECRET_KEY || "write_random_chars";
// const loopCount = 10_000; // 10000
// const charCount = 32; // write 32 for 64
// const encType = "sha512";

// const passwordEncrypt = function (password) {
//   return crypto
//     .pbkdf2Sync(password, keyCode, loopCount, charCount, encType)
//     .toString("hex");
// };

// passwordEncrypt("1234fdf");
const passwordEncrypt=require('../helper/passwordEncrypt')
// Schema:
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: [true, "Email must be required"],
      unique: true,
      validate: [
        (email) => email.includes("@") && email.includes("."),
        "Email type is incorrect",
      ],
    },

    password: {
      type: String,
      trim: true,
      required: true,
      set: (password) => passwordEncrypt(password),
    },

    firstName: String,

    lastName: String,
  },
  {
    collection: "user",
    timestamps: true,
  }
);

// module.exports = {
//     User: mongoose.model('User', UserSchema)
// }

module.exports = mongoose.model("User", UserSchema);
