const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
require('../db/dbconnection')
const Userschema = require('../model/userschema');



exports.login = async (req, res, next) => {



    const { email, password } = req.body;

    try {

        console.log('this is login form')
        const userlogin = await Userschema.findOne({ email: email })

        if (userlogin) {
            const passmatch = await bcrypt.compare(password, userlogin.password)

            if (!passmatch) {
                res.status(400).json("invalid password")
            }
            else {
                res.redirect('/')
            }
        } else {
            res.redirect('registration')
        }


    } catch (err) {
        console.log("this is login error" + err)
    }



}