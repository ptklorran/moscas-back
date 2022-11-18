const Model = require('../../../models/7#Bases')

module.exports = async (req, res) => {
    try {

        const payload = await Model.findByIdAndUpdate(req.body._id, req.body, { new: true })
        return res.json(payload)

    } catch (error) {
        return res.status(401).json({ message: error.message })
    }
}
