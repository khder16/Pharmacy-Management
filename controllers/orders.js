const Drugs = require('../model/Drugs')
const User = require('../model/user')
const { verifyToken, authRole } = require('../middleware/auth');



const orderDrugs = async (req, res) => {
    const { type, name, amount } = await req.body
    let drug, newAmount
    switch (type) {
        case 'capsules':
            drug = await Drugs.findOne({ "capsules.name": name })
            if (drug.capsules.quantity >= amount) {
                newAmount = await drug.capsules.quantity - amount
                drug = await Drugs.findOneAndUpdate({ "capsules.name": name }, { "capsules.quantity": newAmount }, { new: true })

                if (newAmount == 0) {
                    return res.send(`You need to reload ${drug.capsules.name}`)
                }

            }
            else {
                return res.send(` Not enough ${drug.capsules.name}`)
            }
            break;


        case 'syrup':
            drug = await Drugs.findOne({ "syrup.name": name })
            if (drug.syrup.quantity >= amount) {
                newAmount = await drug.syrup.quantity - amount
                drug = await Drugs.findOneAndUpdate({ "syrup.name": name }, { "syrup.quantity": newAmount }, { new: true })
                if (newAmount == 0) {
                    return res.send(`You need to reload ${drug.syrup.name}`)
                }
            }
            else {
                return res.send(` Not enough ${drug.syrup.name}`)
            }
            break;


        case 'drops':
            drug = await Drugs.findOne({ "drops.name": name })
            if (drug.drops.quantity >= amount) {
                newAmount = await drug.drops.quantity - amount
                drug = await Drugs.findOneAndUpdate({ "drops.name": name }, { "drops.quantity": newAmount }, { new: true })
                if (newAmount == 0) {
                    return res.send(`You need to reload ${drug.drops.name}`)
                }
            }
            else {
                return res.send(` Not enough ${drug.drops.name}`)
            }
            break;

            
        default:
            res.send(`thers is no drugs with this name ${name}`)
    }
}


module.exports =  orderDrugs 