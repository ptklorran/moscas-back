const Tenant = require('../../../models/1#Tenants')
const Funcionario = require('../../../models/1#Funcionarios')

module.exports = async (req, res) => {
    try {
        const id = req.useId
        const user = await Funcionario.findById(id)
        const tenant = Tenant.create({
            ...req.body,
            admin: user
        })

        return res.json(tenant)
    } catch (error) {
        return res.status(401).json({ message: error.message })
    }
}