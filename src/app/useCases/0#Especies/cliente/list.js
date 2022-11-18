const Model = require('../../../models/1#Tenants')
// const Funcionario = require('../../../models/1#Funcionarios')

module.exports = async (req, res) => {
    try {
        const id = req.useId
        const payload = await Model.find()
        
        return res.json(payload)
    } catch (error) {
        return res.status(401).json({ message: error.message })
    }
}