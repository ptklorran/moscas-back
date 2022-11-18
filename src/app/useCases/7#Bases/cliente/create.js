// 
const User = require("../../../models/1#Funcionarios")
const Tenant = require("../../../models/0#Tenants")
// const Unilevel = require("../../../models/3#Unilevels")
const mail = require('../../../services/Mail')
const crypto = require('crypto')

module.exports = async (req, res)  => {
    const email = req.body.email.toLowerCase()
    const { cpf } = req.body
    const { cnpj } = req.body

    if(await User.findOne({ email })) {
        return res.status(400).json({ message: 'O email informado está cadastrado para outra conta' })
    }

    if(await User.findOne({ cpf })) {
        return res.status(400).json({ message: 'O cpf informado está cadastrado para outra conta' })
    }
    
    if(await Tenant.findOne({ cnpj })) {
        return res.status(400).json({ message: 'O cnpj informado está cadastrado para outra conta' })
    }

    const token = crypto.randomBytes(20).toString('hex')

    // let usuario = new User({...req.body, activateAccountToken: token, sponsor_id: req.params.sponsor_id})
    let usuario = new User({...req.body, activateAccountToken: token})
    usuario.senha = await usuario.createHash(req.body.senha)
    // usuario.transaction_password = await usuario.createHash(req.body.transaction_password)
    usuario.email = email
    // usuario.sponsor_id = req.params.sponsor_id

    await Tenant.create({
        admin: usuario,
        ativa: false,
        plano: {
            nome: 'nova'
        },
        nome: req.body.nome_empresa,
        cnpj: cnpj,
        segmento: 'Energia Solar'
    })
    await usuario.save()

    // const CadastraPatrocinador = async (dados, nivel) => {
    //     if(!!dados) {
    //         await Unilevel.create({
    //             sponsor_id: dados._id,
    //             indicated_id: usuario._id,
    //             sponsor_name: dados.name,
    //             indicated_name: usuario.name,
    //             indicated_login: usuario.nickname,
    //             indicated_phone: usuario.phone,
    //             level: nivel,
    //             active: false
    //         })
    //         return VerificaPatrao(dados.sponsor_id, nivel)
    //     } else {
    //         return res.status(200).send()
    //     }
    // }

    // const HaPatrocinador = async (id) => {
    //     try {
    //         const patrocinador = await User.findById(id)
    //         return patrocinador
    //     } catch (error) {
    //         return false
    //     }
    // }

    // const VerificaPatrao = async (id_patrocinador, nivel_patrocin) => {
    //     let nivel_patreon = parseInt(nivel_patrocin) + 1
    //     await CadastraPatrocinador(await HaPatrocinador(id_patrocinador), nivel_patreon)
    // }

    const link = `https://${process.env.DOMAIN_APP}/#/activate-account/${token}`
    const data = {
        from: `Cosmos Code <comercial@${process.env.MAILGUN_DOMAIN}>`,
        to: email,
        subject: "Boas Vindas, seus 7 dias grátis estão aqui!",
        html: `
            <div style="flex-direction: column; display: flex; width: 500px; height: 300px; border-radius: 12px; background: #333; padding: 12px; align-items: center; justify-content: center;">
                <img style="margin-bottom: 12px;" width="80" src="https://firebasestorage.googleapis.com/v0/b/cosmos-home-site.appspot.com/o/5.png?alt=media&token=2a907ebf-0020-459e-8469-c3fddf254e8d" />
                <h2 style="color: white; margin-bottom: 12px;"> Bem Vindo ${usuario.nome}! </h2>
                <a href="${link}" target="_blank" style="color: white; font-size: 12pt; text-decoration: none;"> Clique para ativar seus 7 dias grátis! </a>
            </div>
        `
    };


    mail.messages().send(data, function (error, body) {
        console.log(body);
        if(error) {
            console.log("errorrrrrr", error.message)
        }
    });
    
    return res.status(200).send()
    
    // if(req.params.sponsor_id !== 'nosponsor') {
    //     VerificaPatrao(req.params.sponsor_id, 0)
    // } else {
        // return res.status(200).send()
    // }
}