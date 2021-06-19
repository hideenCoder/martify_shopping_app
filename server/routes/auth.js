const express = require('express');
const { check, validationResult, body } = require('express-validator');
const router = express.Router();
const helper = require('../config/helpers');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const dotenv = require("dotenv")
dotenv.config({ path: './config.env' });

// LOGIN ROUTE
router.post('/login', [helper.hasAuthFields, helper.isPasswordAndUserMatch], (req, res) => {
    let token = jwt.sign({ state: 'true', email: req.body.email, username: req.body.username }, helper.secret, {
        algorithm: 'HS512',
        expiresIn: '4h'
    });
    let username = req.body.email.split("@")[0]
    res.json({ token: token, auth: true, email: req.body.email, username: username });
});

// REGISTER ROUTE
router.post('/register', [
    check('email').isEmail().not().isEmpty().withMessage('Field can\'t be empty')
        .normalizeEmail({ all_lowercase: true }),
    check('password').escape().trim().not().isEmpty().withMessage('Field can\'t be empty')
        .isLength({ min: 6 }).withMessage("must be 6 characters long"),
    body('email').custom(value => {
        return helper.database.table('users').filter({
            $or:
                [
                    { email: value }, { username: value.split("@")[0] }
                ]
        }).get().then(user => {
            if (user) {
                console.log(user);
                return Promise.reject('Email / Username already exists, choose another one.');
            }
        })
    })
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    } else {

        let email = req.body.email;
        let username = email.split("@")[0];
        let password = await bcrypt.hash(req.body.password, 10);
        let fname = req.body.fname;
        let lname = req.body.lname;

        /**
         * ROLE 777 = ADMIN
         * ROLE 555 = CUSTOMER
         **/
        helper.database.table('users').insert({
            username: username,
            password: password,
            email: email,
            role: 555,
            lname: lname || null,
            fname: fname || null
        }).then(lastId => {
            if (lastId > 0) {
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.EMAIL_PASS
                    }
                });

                const mailOptions = {
                    from: process.env.EMAIL, // sender address
                    to: email, // list of receivers
                    subject: 'Team Hidden_Coder from Martify',// Subject line
                    html: '<p>You have registerd sucessfully. </br> Welcome to Martify!!</p>'// plain text body
                };

                transporter.sendMail(mailOptions, function (err, info) {
                    if (err)
                        console.log(err)
                    else
                        console.log(info);
                });

                res.status(201).json({ message: 'Registration successful.' });
            } else {
                res.status(501).json({ message: 'Registration failed.' });
            }
        }).catch(err => res.status(433).json({ error: err }));
    }
});


module.exports = router;
