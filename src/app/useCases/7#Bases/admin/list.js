const Model = require('../../../models/7#Bases')

module.exports = async (req, res) => {
    try {
        let query = {}
        const queryDeleted = { regex: { $regex: new RegExp('no'), $options: 'i'}}
        query['deleted.status'] = queryDeleted.regex

        const paginate = await Model.paginate(
            query,
            {
                lean: true,
                page: parseInt(req.body.page),
                limit: req.body.limitPerPage ? req.body.limitPerPage : 10
            })

        return res.json(paginate)
    } catch (error) {
        return res.json({ message: error.message })
    }
}
