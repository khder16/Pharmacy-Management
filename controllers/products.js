const Drugs = require('../model/Drugs')
const mongoose = require('mongoose')
const User = require('../model/user')
const Admin = require('../model/admin')
const { verifyToken, authRole } = require('../middleware/auth');
const { compare } = require('bcryptjs');




const getAllDrugs = async (req, res) => {
    try {
        const allDrugs = await Drugs.find({})
        res.status(200).json({ allDrugs });

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}



const updateDrugs = async (req, res) => {
    try {
        const user = await Admin.findOne({ _id: req.body._id })
        const name = await req.body.name

        if (user.role === 'Admin') {

            const dr = await drugs.findOneAndUpdate({ 'Drugs.capsules.name': name }, { 'Drugs.capsules': req.body }, { new: true });
            console.log(dr)
            res.send(dr);
        }
        else {
            res.status(403).send('Admins only');
        }
        // Optionally send the updated document back in the response
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error'); // Send an error response if something goes wrong
    }
}



const deleteAll = async (req, res) => {

    Drugs.deleteMany({}).then(() => console.log('Deleted is Done'))

    res.status(200).send(`All drugs deleted`)
}

const deletById = async (req, res) => {
    try {
        if (req.session.authorized) {
            const user = await Admin.findOne({ _id: req.body._id })
            if (user.role === 'Admin') {
                const deleteI = await drugs.findByIdAndDelete(req.params.id)
                const done = await drugs.findById({ _id: req.params.id })
                if (done) {
                    console.log(`drugs can't be deleted `)
                }
                if (!deleteI) {
                    return `There is no id like this `
                }
            }
        }
        else {
            res.status(403).send('Admins only');
        }
    } catch (error) {
        console.log(error)
    }
}


const addDrugs = async (req, res) => {
    try {
        let existingDrug
        const { type, name, quantity, price, company, productionDate, expirationDate } = req.body

        if (type === 'capsules') {

            try {
                const newCapsule = {
                    name: req.body.name,
                    price: req.body.price,
                    company: req.body.company,
                    productionDate: req.body.productionDate,
                    expirationDate: req.body.expirationDate,
                    quantity: req.body.quantity
                }
                existingDrug = await Drugs.findOne({ 'capsules.name': req.body.name })
                if (existingDrug) {
                    await Drugs.findOneAndUpdate({ 'capsules.name': req.body.name }, { $inc: { "capsules.quantity": req.body.quantity } })
                    return res.status(200).send('Quantity updated for an existing drug')
                }
                else {
                    const drugs = new Drugs({
                        capsules: newCapsule
                    })
                    await drugs.save()
                    res.status(200).send(`a new  capsules added`)
                }
            } catch (err) {
                console.log(err)
            }
        }

        if (type === 'syrup') {
            const newSyrup = {
                name: req.body.name,
                price: req.body.price,
                company: req.body.company,
                productionDate: req.body.productionDate,
                expirationDate: req.body.expirationDate,
                quantity: req.body.quantity
            }
            existingDrug = await Drugs.findOne({ 'syrup.name': req.body.name })
            if (existingDrug) {
                await Drugs.findOneAndUpdate({ 'syrup.name': req.body.name }, { $inc: { "syrup.quantity": req.body.quantity } })
                return res.status(200).send('Quantity updated for an existing drug')
            }
            else {
                const drugs = new Drugs({
                    syrup: newSyrup,
                });

                drugs.save()
                res.status(200).send(`a new syrup added`)
            }
        }

        if (type === 'cream') {
            const newCream = {
                name: req.body.name,
                price: req.body.price,
                company: req.body.company,
                productionDate: req.body.productionDate,
                expirationDate: req.body.expirationDate,
                quantity: req.body.quantity
            }
            existingDrug = await Drugs.findOne({ 'cream.name': req.body.name })
            if (existingDrug) {
                await Drugs.findOneAndUpdate({ 'cream.name': req.body.name }, { $inc: { "cream.quantity": req.body.quantity } })
                return res.status(200).send('Quantity updated for an existing drug')
            }
            else {
                const drugs = new Drugs({
                    cream: newCream
                })

                drugs.save()
                res.status(200).send(`a new cream added`)
            }
        }

        if (type === 'vitamen') {
            const newVitamen = {
                name: req.body.name,
                price: req.body.price,
                company: req.body.company,
                productionDate: req.body.productionDate,
                expirationDate: req.body.expirationDate,
                quantity: req.body.quantity
            }
            existingDrug = await Drugs.findOne({ 'vitamen.name': req.body.name })


            if (existingDrug) {
                await Drugs.findOneAndUpdate({ 'vitamen.name': req.body.name }, { $inc: { "vitamen.quantity": req.body.quantity } })
                return res.status(200).send('Quantity updated for an existing drug')
            }
            else {
                const drugs = Drugs({
                    vitamen: newVitamen
                })
                drugs.save()
                res.status(200).send(`a new  vitamen added`)
            }
        }

        if (type === 'drops') {
            const newDrops = {
                name: req.body.name,
                price: req.body.price,
                company: req.body.company,
                productionDate: req.body.productionDate,
                expirationDate: req.body.expirationDate,
                quantity: req.body.quantity
            }
            existingDrug = await Drugs.findOne({ 'drops.name': req.body.name })

            if (existingDrug) {
                await Drugs.findOneAndUpdate({ 'drops.name': req.body.name }, { $inc: { "drops.quantity": req.body.quantity } })
                return res.status(200).send('Quantity updated for an existing drug')
            }
            else {
                const drugs = Drugs({
                    drops: newDrops
                })
                drugs.save()
                res.status(200).send(`a new drops added`)
            }
        }
        else {
            res.send(`you can't add this drug`)
        }
    } catch (err) {
        console.log(err)
    }
}
module.exports = { getAllDrugs, addDrugs, deleteAll, deletById, updateDrugs }