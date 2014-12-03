#!/usr/bin/env node

// MongoDB user

process.env.CCK = 'cherry';

var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://localhost/cw-user');

var User = require('../models/userSchema.js');

var users = require('./usersList.js');

var count = users.length;

users.forEach(function (userObject) {

    var user = new User(userObject);

    user.save(function(err, doc) {

        count--

        if (err) console.log(err);
        else console.log(doc);

        if (!count) process.exit()

    })

})
