const Drugs = require('../model/Drugs')
const User = require('../model/user')
const { verifyToken, authRole } = require('../middleware/auth');
const braintree = require('braintree');




var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.merchantId,
    publicKey: process.env.publicKey,
    privateKey: process.env.privateKey
});



const calculateTotalPrice = async (type, name, amount) => {
    let drug
    switch (type) {
        case 'capsules':
            drug = await Drugs.findOne({ "capsules.name": name })
            if (drug.capsules.quantity >= amount) {
                return drug.capsules.price * amount
            }
            else {
                return ` Not enough ${drug.capsules.name}`
            }

            break;
        case 'syrup':
            drug = await Drugs.findOne({ "syrup.name": name })
            if (drug.syrup.quantity >= amount) {
                return drug.capsules.price * amount
            }
            else {
                return ` Not enough ${drug.syrup.name}`
            }
            break;


        case 'drops':
            drug = await Drugs.findOne({ "drops.name": name })
            if (drug.drops.quantity >= amount) {
                return drug.capsules.price * amount
            }
            else {
                return ` Not enough ${drug.drops.name}`
            }
            break;


        default:
            return `thers is no drugs with this name ${name}`
    }
}


let totalPrice
const purchasesDrugs = async (req, res) => {
    const { type, name, amount } = req.body

    try {
        totalPrice = await calculateTotalPrice(type, name, amount)
    } catch (error) {
        res.send(error)
    }
}


const checkout = async (req, res) => {

    const { number, expirationDate, cvv, billingAddress } = req.body

    const result = await gateway.transaction.sale({
        amount: totalPrice,
        paymentMethodNonce: 'fake-valid-nonce',

        creditCard: {
            number: number,
            expirationDate: expirationDate,
            cvv: cvv,
            billingAddress: billingAddress
        },
        Option: {
            submitForSettlement: true
        }
    })

    if (result.success) {
        res.send('Transaction successful')
        totalPrice = 0
    } else {
        res.status(500).send('Transaction failed')
    }
}




module.exports =  {checkout, purchasesDrugs} 