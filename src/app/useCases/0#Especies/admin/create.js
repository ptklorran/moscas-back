const Model = require('../../../models/0#Especies')

module.exports = async (req, res) => {
    try {
        const payload = Model.create({...req.body})
        return res.json(payload)
    } catch (error) {
        return res.status(401).json({ message: error.message })
    }
}