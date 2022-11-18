const User = require('../../../models/1#Funcionarios')

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
    
    if (!await user.compareHash(senha)) {
        return res.status(400).json({ message: 'Senha inválida' })
    }

    return res.json({ user, token: User.generateToken(user) })
}

