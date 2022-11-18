class Cases {
    async cases(req, res) {
        try {
            const CASES = {
                'list': (req, res) => require('./list.js')(req, res),
                'create': (req, res) => require('./create.js')(req, res),
                'update': (req, res) => require('./update.js')(req, res),
                'delete': (req, res) => require('./delete.js')(req, res),
                'activate-account': (req, res) => require('./activate-account.js')(req, res),
                'create-session': (req, res) => require('./create-session.js')(req, res),
                'forgot-password': (req, res) => require('./forgot-password.js')(req, res),
                'forgot-password-fire': (req, res) => require('./forgot-password-fire.js')(req, res),
                'show': (req, res) => require('./show.js')(req, res),
            }
            CASES[req.params.case](req, res)
        } catch (error) {
            return res.json({ message: error.message })
        }
    }
}

module.exports = new Cases()