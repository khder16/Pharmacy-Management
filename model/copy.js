const mongoose = require('mongoose')

const DrugsDB = new mongoose.Schema({

    Drugs: {
        capsules:{
        name: {
            type: String,
            require: [true, "Drug name must be provided"],
            minlength:[3,'Drugs name must have at least 3 character']
        },
        price: {
            type: Number,
            require: [true, "Drug Price must be provided"]
        },
        Company: {
            type: String,
            require: [true, "Company name must provided"]
        },
        productionDate:Date,
        expirationDate:Date,
        quantity: {
            type: Number,
            default:1,
            required: [true, "Quantity must be provided"],
            min: 0
        },
    syrup: {
        name: {
            type: String,
            require: [true, "Drug name must be provided"]
        },
        price: {
            type: Number,
            require: [true, "Drug Price must be provided"]
        },
        Company: {
            type: String,
            require: [true, "Company name must provided"]
        },
        productionDate:Date,
        expirationDate:Date,
        quantity: {
            type: Number,
            default:1,
            required: [true, "Quantity must be provided"],
            min: 0
        },
    },
    drops: {
        name: {
            type: String,
            require: [true, "Drug name must be provided"]
        },
        price: {
            type: Number,
            require: [true, "Drug Price must be provided"]
        },
        Company: {
            type: String,
            require: [true, "Company name must provided"]
        },
        productionDate:Date,
        expirationDate:Date,
        quantity: {
            type: Number,
            default:1,
            required: [true, "Quantity must be provided"],
            min: 0
        },
    }
},
    Cream: {
        hairCream :{
        name: {
            type: String,
            require: [true, "Drug name must be provided"]
        },
        price: {
            type: Number,
            require: [true, "Drug Price must be provided"]
        },
        Company: {
            type: String,
            require: [true, "Company name must provided"]
        },
        productionDate:Date,
        expirationDate:Date,
        quantity: {
            type: Number,
            default:1,
            required: [true, "Quantity must be provided"],
            min: 0
        },
    },
    bodyCream: {
        name: {
            type: String,
            require: [true, "Drug name must be provided"]
        },
        price: {
            type: Number,
            require: [true, "Drug Price must be provided"]
        },
        Company: {
            type: String,
            require: [true, "Company name must provided"]
        },
        productionDate:Date,
        expirationDate:Date,
        quantity: {
            type: Number,
            default:1,
            required: [true, "Quantity must be provided"],
            min: 0
        },
    }},
    vitamens: {
        name: {
            type: String,
            require: [true, "Drug name must be provided"]
        },
        price: {
            type: Number,
            require: [true, "Drug Price must be provided"]
        },
        Company: {
            type: String,
            require: [true, "Company name must provided"]
        },
        productionDate:Date,
        expirationDate:Date,
        quantity: {
            type: Number,
            default:1,
            required: [true, "Quantity must be provided"],
            min: 0
        },
    }
}})

module.exports = mongoose.model('drugs',DrugsDB)