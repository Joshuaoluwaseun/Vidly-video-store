const config = require('config');
const jwt = require('jsonwebtoken');
const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 50,
        unique: true, 
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1023
    },
    isAdmin: Boolean
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
    return token
}

const User = mongoose.model('User', userSchema)

function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(30).required(),
        email: Joi.string().min(5).max(30).required().email(),
        password: Joi.string().min(5).max(20).required()
    }
    return Joi.validate(user, schema)
}

exports.User = User;
exports.validate = validateUser;