const User = require('../../../models/1#Funcionarios')
const crypto = require('crypto')
const mail = require('../../../services/Mail')

module.exports = async(req, res) => {
    try {
        const { email } = req.body;

        try {
            const user = await User.findOne({ email })

            if (!user) return res.status(400).send({ message: 'Não encontramos um usuário correspondente ao email informado!' })

            let token = crypto.randomBytes(20).toString('hex')
            let now = new Date()
            now.setHours(now.getHours() + 1)

            await User.findByIdAndUpdate(user._id, {
                '$set': {
                    passwordResetToken: token,
                    passwordResetExpires: now
                }
            })
            const data = {
                from: `Suporte - ${process.env.APP_NAME} <suporte@${process.env.DOMAIN_APP}>`,
                to: user.email,
                subject: "Recupere sua senha!",
                text: `Olá ${user.nome}, você solicitou uma recuperação de senha, recupere sua senha no link a seguir: https://${process.env.DOMAIN_APP}/#/recover-pass/${token}`
            };

            mail.messages().send(data, function (error, body) {
                if(error) return res.status(400).send({ message: err })
                if(body) return res.json({ message: "Um email com o link de recuperação de senha foi enviado." })
            });
            

            // mailer.sendMail({
            //     from: `"Investimentos" <p4bot1@gmail.com>`,
            //     to: email,
            //     subject: 'Recuperação de senha',
            // }, err => {
            //     if(err) return res.status(400).send({ message: err })

            //     return res.json({ message: "Um email com o link de recuperação de senha foi enviado." })
            // })


        } catch (error) {
            return res.status(400).send({ message: "Erro ao enviar, tente novamente." , error: error.message})
        }
    } catch (error) {
        
    }
}