const User = require('../../../models/1#Funcionarios')

module.exports = async(req, res) => {
    try {
        let token = req.body.token
        let user = await User.findOne({ passwordResetToken: token })
        if(!!user) {
            const now = new Date()
            if((token === user.passwordResetToken) && (now < user.passwordResetExpires)) {
                await User.findByIdAndUpdate(user._id, {
                    senha: await user.createHash(req.body.nova_senha)
                })
                return res.status(200).send({ message: 'sucesso' })
            } else {
                return res.status(400).send({ message: 'Token inválido!' })
            }
        }

    } catch (error) {
        return res.status(400).send({ message: 'Token inválido', error: error })
    }
        
}
