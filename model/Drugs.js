const mongoose = require('mongoose')

const CapsulesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
    },
    price: {
        type: Number,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    productionDate: Date,
    expirationDate: Date,
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
});

const SyrupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
    },
    price: {
        type: Number,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    productionDate: Date,
    expirationDate: Date,
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
});
const dropsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
    },
    price: {
        type: Number,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    productionDate: Date,
    expirationDate: Date,
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
})


const creamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
    },
    price: {
        type: Number,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    productionDate: Date,
    expirationDate: Date,
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
})

const vitaminsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
    },
    price: {
        type: Number,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    productionDate: Date,
    expirationDate: Date,
    quantity: {
        type: Number,
        default: 1,
        required: true,
        min: 0,
    },
})

const Drugs = new mongoose.Schema({
    capsules: CapsulesSchema,
    syrup: SyrupSchema,
    cream: creamSchema,
    vitamen: vitaminsSchema,
    drops: dropsSchema
});

module.exports = mongoose.model('Drugs', Drugs)
