const User = require('../../../models/1#Funcionarios')
const Tenant = require("../../../models/0#Tenants")

module.exports =  async (req, res) => {
    const { senha } = req.body
    const email = req.body.username.toLowerCase()
    
    let user = await User.findOne({ email }).select('+senha')
    
    if (!user) {
        user = await User.findOne({ nickname: email }).select('+senha')
        if(!user) {
            user = await User.findOne({ cpf: email }).select('+senha')
            if(!user) {
                return res.status(400).json({ message: 'Usuário não encontrado' })
            }
        }
        
    }
    
    const tenants = await Tenant.find({ 'admin._id': user._id })
    
    if (!await user.compareHash(senha)) {
        return res.status(400).json({ message: 'Senha inválida' })
    }

    return res.json({ user: { ...user._doc, empresas: tenants}, token: User.generateToken(user) })
}

