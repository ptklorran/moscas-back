const Model = require('../../../models/')

module.exports = async (req, res) => {
    try {
        const id = req.body._id
        await Model.findByIdAndRemove(id)
        return res.status(200).send()
    } catch (error) {
        return res.status(401).json({ message: error.message })
    }
}