// 
const User = require("../../../models/1#Funcionarios")
// const Unilevel = require("../../../models/3#Unilevels")
// const mail = require('../../../services/Mail')
const crypto = require('crypto')

module.exports = async (req, res)  => {
    try {
        
        const email = req.body.email.toLowerCase()
        const { cpf } = req.body
    
        if(await User.findOne({ email })) {
            return res.status(400).json({ message: 'O email informado está cadastrado para outra conta' })
        }
    
        if(await User.findOne({ cpf })) {
            return res.status(400).json({ message: 'O cpf informado está cadastrado para outra conta' })
        }
        
        const token = crypto.randomBytes(20).toString('hex')
    
        // let usuario = new User({...req.body, activateAccountToken: token, sponsor_id: req.params.sponsor_id})
        let usuario = new User({...req.body, activateAccountToken: token})
        usuario.senha = await usuario.createHash(req.body.senha)
        // usuario.transaction_password = await usuario.createHash(req.body.transaction_password)
        usuario.email = email
        // usuario.sponsor_id = req.params.sponsor_id
        await usuario.save()
    
        // console.log("tenant", tenant)
        // usuario.tenant = tenant
        
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
    
        // const link = `https://${process.env.DOMAIN_APP}/#/activate-account/${token}`
        // const data = {
        //     from: `Cosmos Code <comercial@${process.env.MAILGUN_DOMAIN}>`,
        //     to: email,
        //     subject: "Boas Vindas, seus 7 dias grátis estão aqui!",
        //     html: `
        //     <section class="container">
        //     <div class="logo">
        //         <img width="100" src="https://firebasestorage.googleapis.com/v0/b/cosmos-home-site.appspot.com/o/5.png?alt=media&token=2a907ebf-0020-459e-8469-c3fddf254e8d" alt="">
        //     </div>
        //     <div class="title">
        //         <h3>Bem Vindo(a) a Cosmos Code</h3>
        //     </div>
        //     <div class="container-texto">
        //         <h3 style="font-family: 'PT Sans', sans-serif; color: #404B5A;">Olá ${usuario.nome}</h3>
        //         <span style="font-family: 'PT Sans', sans-serif;">  Agora você faz parte do time de parceiros Cosmos Code e 
        //             ficamos muito felizes de ter você conosco, acesse o link para ativar 7 dias grátis: <a href="${link}">Ativar Agora!</a>, 
        //             faça login na plataforma e comece a explorar agora mesmo todos os recursos que temos disponiveis 
        //             para você e seu negócio.
        //         </span>
        //         <span style="font-family: 'PT Sans', sans-serif; margin-top: 30px;">Abraços</span>
        //         <span style="font-family: 'PT Sans', sans-serif;">Equipe Cosmos Code</span>
        //         <div class="icons" style="padding: 5px;">
        //             <a target="_blanck" href="https://www.instagram.com/cosmos_code/">
        //                 <img width="25" src="https://firebasestorage.googleapis.com/v0/b/neegu-185ce.appspot.com/o/instagram%20(1).svg?alt=media&token=c695e617-5872-4f69-95d5-24bce57d14e1" alt="">
        //             </a>
        //         </div>
        //         <div style="margin-top: 10px; display: flex;
        //         flex-direction: column;
        //         text-align: center;" >
        //             <span style="font-family: 'PT Sans', sans-serif; padding: 2px;">Tem alguma dúvida?</span>
        //             <span style="font-family: 'PT Sans', sans-serif; padding: 2px;"">Entre em contato com o nosso suporte no e-mail: suporte@cosmoscode.dev</span>
        //             <span style="font-family: 'PT Sans', sans-serif; padding: 2px;"">Rua 19 de Maio, 160, Bairro Fonte Nova - Santana / AP, CEP: 68928-298.</span>
        //         </div>
        //     </div>
        // </section>
        //     `
        // };
    
        return res.status(200).send()
        // mail.messages().send(data, async (error, body) => {
        //     if(error) {
        //         return res.status(401).json({ message: error.message })
        //     }

        // });
        
        
        // if(req.params.sponsor_id !== 'nosponsor') {
        //     VerificaPatrao(req.params.sponsor_id, 0)
        // } else {
            // return res.status(200).send()
        // }
    } catch (error) {
        return res.status(401).json({ message: error.message })
    }
}