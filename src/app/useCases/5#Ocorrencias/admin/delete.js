const Model = require("../../../models/5#Ocorrencia")

module.exports = async (req, res) => {
    try {
        const payload = await Model.findByIdAndUpdate(req.body._id, {
            deleted: {
                status: 'yes',
                data: new Date()
            }
        })
        return res.json(payload)
    } catch (error) {
        return res.status(401).json({ message: error.message })
    }
}
