const Model = require('../../../models/28#FormasDePagamentos')

module.exports = async (req, res) => {
    try {

        req.body.itens.map(async item=> {
            const id = item._id
            await Model.findByIdAndUpdate(id, {
                deleted: {
                    status: 'yes',
                    date: new Date()
                }
            })
        })
        return res.status(200).send()
    } catch (error) {
        return res.status(401).json({ message: error.message })
    }
}