const Model = require('../../../models/7#Bases')

module.exports = async (req, res) => {
    try {
        console.log("e")
        const payload = await Model.create({
            ...req.body,
        })

        return res.json(payload)
    } catch (error) {
        return res.status(401).json({ message: error.message })
    }
}
