const User = require('../../../models/1#Funcionarios')
const Tenant = require('../../../models/0#Tenants')

module.exports = async( req, res) => {
    let user = await User.findOne({ activateAccountToken: req.params.id })
    let empresa = await Tenant.findOne({ 'admin._id': user._id, 'plano.nome': 'nova' })

    Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }
    
    var expiracao_7_dias = new Date()
    expiracao_7_dias.setDate(expiracao_7_dias.getDate() + 7)
    
    empresa.data_expiracao_plano = expiracao_7_dias
    empresa.ativa = true
    empresa.plano = {
        _id: '7dias',
        nome: '7 dias'
    }
    
    if(!!user) {

        await User.findByIdAndUpdate(user._id, {
            accountActivated: true
        })

        await empresa.save()

        return res.status(200).send({ message: 'sucesso' })

    } else {
        return res.status(400).send({ message: 'Token inválido' })
    }
}
