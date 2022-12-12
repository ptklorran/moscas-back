const Model = require('../../../models/2#EspeciesHospedeiro')
const Occurrence = require('../../../models/5#Ocorrencia')

module.exports = async (req, res) => {
    try {
        const id = req.body._id
        const haveOccurrencies = await Occurrence.find({ 'especie_hospedeiro._id': id })
        if (haveOccurrencies.length) {
            return res.status(401).json({ message: "Há ocorrências para este registro, apague elas antes" });
        }
        await Model.findByIdAndRemove(id)
        return res.status(200).send()
    } catch (error) {
        return res.status(401).json({ message: error.message })
    }
}
