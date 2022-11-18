const Model = require('../../../models/7#Bases')

module.exports = async (req, res) => {
    try {
        const id = req.body._id
        const p = await Model.findByIdAndUpdate(id, {
            deleted: {
                status: 'yes',
                date: new Date()
            }
        })
        console.log('p', p)
        return res.status(200).send()
    } catch (error) {
        return res.status(401).json({ message: error.message })
    }
}
