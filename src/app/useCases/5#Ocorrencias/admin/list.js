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
            const queryNome = req.body.nome ? { regex: { $regex: new RegExp(req.body.nome), $options: 'i'}} : false
            const queryBase = { regex: { $regex: new RegExp(req.body.base), $options: 'i'}}
            queryBase ? query.base = queryBase.regex : false
            queryNome ? query.nome = queryNome.regex : false
        }

        const paginate = await Model.paginate(
            query,
            {
                ...options,
                lean: true,
                page: parseInt(req.body.page),
                limit: req.body.limitPerPage ? req.body.limitPerPage : 1000
            })

        return res.json(paginate)
    } catch (error) {
        return res.json({ message: error.message })
    }
}
