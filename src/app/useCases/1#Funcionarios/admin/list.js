const Model = require('../../../models/1#Funcionarios')
const User = require('../../../models/1#Funcionarios')

module.exports = async (req, res) => {
    try {
        let query = {
            // read: [

            // ]
        }

        const id = req.userId
        const user = await User.findById(id)

        // const queryAdmin = { regex: { $regex: new RegExp(user.tenant.cnpj), $options: 'i'}}
        // const queryDeleted = { regex: { $regex: new RegExp('no'), $options: 'i'}}
        // const queryTenant = { regex: { $regex: new RegExp(req.tenantId), $options: 'i'}}
        // const queryCategoria = req.body.categoria ? { regex: { $regex: new RegExp(req.body.categoria), $options: 'i'}} : false
        const queryNome = req.body.nome ? { regex: { $regex: new RegExp(req.body.nome), $options: 'i'}} : false
        // const queryDescricao = req.body.descricao ? { regex: { $regex: new RegExp(req.body.descricao), $options: 'i'}} : false

        queryNome ? query.nome = queryNome.regex : false
        // queryDescricao ? query.descricao = queryDescricao.reges : false
        // queryCategoria ? query['categoria._id'] = queryCategoria.regex : false

        // query.deleted = {
        //     status: queryDeleted.regex
        // }
        // query.tenant = {
        //     _id: queryTenant.regex
        // }

        // const result = await Model.find({ 'admin._id': user._id })
        const paginate = await Model.paginate(
            query,
            { 
                lean: true,
                leanWithId: true,
                page: parseInt(req.body.page), 
                limit: req.body.limitPerPage ? req.body.limitPerPage : 10
            })
        
        // const data = {
        //     ...paginate,
        //     docs: result
        // }
        return res.json(paginate) 
    } catch (error) {
        return res.json({ message: error.message })
    }
}