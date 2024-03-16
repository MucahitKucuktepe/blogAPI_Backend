"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG API
------------------------------------------------------- */

require("express-async-errors");

const User = require("../models/user.model");
const passwordEncrpyt = require("../helper/passwordEncrypt");

module.exports = {
  list: async (req, res) => {
    const data= await res.getModelList(User)
    res.status(200).send({
      error: false,
      data: data,
    });
  },
  create: async (req, res) => {
    const data = await User.create(req.body);
    res.status(201).send({
      error: false,
      body: req.body,
      data: data,
    });
  },
  read: async (req, res) => {
    const data = await User.find({ _id: req.params.userId });
    res.status(202).send({
      error: false,
      data: data,
    });
  },
  update: async (req, res) => {
    const data = await User.updateOne({ _id: req.params.userId }, req.body);
    const newdata = await User.find({ _id: req.params.userId });
    res.status(202).send({
      error: false,
      body: req.body,
      data: data, // info about update
      // güncel veriyi istiyorsan tekrar çağır
      newdata: newdata,
    });
  },
  delete: async (req, res) => {
    const data = await User.deleteOne({ _id: req.params.userId });
    // console.log(data);
    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },

  //!LOGİN LOGOUT
  login: async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      // const user =await User.findOne({email:email})
      const user = await User.findOne({ email });
      if (user && user.password == passwordEncrpyt(password)) {
        // SESSİON 
        (
          // res.session={
          //     email:user.email,
          //     password:user.password
          // }
          (req.session.id = user.id)
        ),
          (req.session.password = user.password);
        /* SESSİON  */;

        /* COOIKIES  */
        if (req.body?.remindMe) {
          req.session.remindMe = req.body.remindMe;
          //SET maxAge
          req.sessionOptions.maxAge = 1000 * 60 * 60 * 24;
        }
        /* COOIKIES  */

        res.status(200).send({
          error: false,
          message: "Login OK!",
          user,
        });
      } else {
        res.errorStatusCode = 401;
        throw new Error("Email and password required");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Email and password required");
    }
  },
  logout: async (req, res) => {
    //session destroy
    req.session=null
    res.status(200).send({
        error: false,
        message: "Logout OK!",
      
      });
  },
};
