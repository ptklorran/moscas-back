const Model = require("../../../models/5#Ocorrencia")

module.exports = async (req, res) => {
    try {
        let query = {}
        let options = {}

        const queryDeleted = { regex: { $regex: new RegExp('no'), $options: 'i'}}
        query['deleted.status'] = queryDeleted.regex

        if(req.body.all) {
            options.pagination = false
        } else {
            const queryId = req.body.id_ocorrencia ? { regex: { $regex: new RegExp(req.body.id_ocorrencia), $options: 'i'}} : false
            const queryNome = req.body.nome ? { regex: { $regex: new RegExp(req.body.nome), $options: 'i'}} : false
            const queryBase = { regex: { $regex: new RegExp(req.body.base), $options: 'i'}}
            queryBase ? query.base = queryBase.regex : false
            queryNome ? query.nome = queryNome.regex : false
            queryId ? query.id_ocorrencia = queryNome.regex : false
        }

        const paginate = await Model.paginate(
            query,
            {
                ...options,
                lean: true,
                page: parseInt(req.body.page),
                limit: req.body.limitPerPage ? req.body.limitPerPage : 2000
            })

        return res.json(paginate)
    } catch (error) {
        return res.json({ message: error.message })
    }
}
