class Cases {
    async cases(req, res) {
        try {
            const CASES = {
                'list': (req, res) => require('./list.js')(req, res),
                'create': (req, res) => require('./create.js')(req, res),
                'update': (req, res) => require('./update.js')(req, res),
                'delete': (req, res) => require('./delete.js')(req, res)
            }
            CASES[req.params.case](req, res)
        } catch (error) {
            return res.json({ message: error.message })
        }
    }
}

module.exports = new Cases()