const Joi = require('joi');
const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 30
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20,
    },
    isGold: {
        type: Boolean,
        default: false
    }
});

const Customer = mongoose.model('Customer', customerSchema);
function validateCustomers(customer) {
    const schema = {
        name: Joi.string().min(5).max(20).required(),
        phone: Joi.string().min(5).max(20).required(),
        isGold: Joi.boolean().required()
    };
    return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomers;