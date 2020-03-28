const mongoose = require('mongoose');
const User = require('../models/userSchema');
const crypto = require('crypto');
const messages = require('../middleware/messages');


const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/;
const loginRegex = /^[_-]*[a-zA-Z0-9]{3,16}[_-]*/;


exports.signup = (req, res, next) => {
    console.log(req.body);
    // login validation
    const login = req.body.login;
    if (!login.match(loginRegex) && login.length <= 16) {
        return res.status(400).json({message: messages.loginNotValid})
    }

    // password validation
    const password = req.body.password;
    if (!login.match(loginRegex)) {
        return res.status(400).json({message: messages.passwordNotValud})
    }

    // Add new User
    // step 1: check vacant login
    User.findOne({login: login}).exec()
    .then(user => {
        if (user) return res.status(409).json({message: messages.loginClaimed})

        // step 2: filling fields
        const newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            login: login,
            password: crypto.pbkdf2Sync(password, 'help', 5, 64, 'sha512')
        })

        // step 3: record
        newUser.save()
        .then(result => {
            res.status(201).json({message: messages.userSuccess, data: {
                id: result._id,
                login: result.login
            }})
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({error: error})
        })
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({error: error})
    })
} 

exports.signin = (req, res, next) => {
    console.log(req.body);
    const login = req.body.login;
    const password = crypto.pbkdf2Sync(req.body.password, 'help', 5, 64, 'sha512')

    User.findOne({ login: login, password: password })
    .exec()
    .then(user => {
        if (!user) 
            return res.status(401).json({message: messages.authFiled});

        res.status(200).json({message: messages.authSuccess})

    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({error: error})
    })
}
