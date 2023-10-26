const Drugs = require('../model/Drugs')



const search =  async (req, res) => {
    try {
        let name = req.body.name
        const result = await Drugs.find({ 
            $or: [           
            {'capsules.name': { $regex: name, $options:"i" }},
            {'syrup.name': { $regex: name, $options:"i" }},
            {'cream.name': { $regex: name, $options:"i" }},
            {'vitamen.name': { $regex: name, $options:"i" }},
            {'drops.name': { $regex: name, $options:"i" }}
            ]
    })
        res.send(result)
    } catch (err) {
        console.log(err)
    }
}

module.exports = search