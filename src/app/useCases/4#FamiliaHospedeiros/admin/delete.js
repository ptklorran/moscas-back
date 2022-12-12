const Model = require("../../../models/4#FamiliaHospedeiro")
const Occurrence = require('../../../models/5#Ocorrencia')

module.exports = async (req, res) => {
    try {
        const id = req.body._id;
        const haveOccurrencies = await Occurrence.find({ 'familia_hospedeiro._id': id })
        if (haveOccurrencies.length) {
            return res.status(401).json({ message: "Há ocorrências para este registro, apague elas antes" });
        }
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
