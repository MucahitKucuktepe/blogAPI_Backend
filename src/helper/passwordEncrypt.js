"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG API
------------------------------------------------------- */

//Password Encrytion

const crypto = require("node:crypto");

const keyCode = process.env?.SECRET_KEY || "write_random_chars";
const loopCount = 10_000; // 10000
const charCount = 32; // write 32 for 64
const encType = "sha512";

module.exports = function (password) {
  return crypto
    .pbkdf2Sync(password, keyCode, loopCount, charCount, encType)
    .toString("hex");
};
