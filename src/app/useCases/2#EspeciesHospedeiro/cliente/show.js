const User = require('../../../models/2#Users')

module.exports =  async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        return res.json(user)        
    } catch (error) {
        return res.status(401).json({ error: error.message })
    }
}

