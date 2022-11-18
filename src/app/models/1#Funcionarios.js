const mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = new mongoose.Schema({
    foto: String,
    nome: String,
    email: String,
    cpf: String,
    senha: {
        type: String,
        select: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    activateAccountToken: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
    updated_at: {
        type: Array,
        default: [],
        select: false
    }
})


Schema.methods = {
    compareHash(senhaAComparar) {
        return bcrypt.compare(senhaAComparar, this.senha);
    },
    
    async createHash(pass) {
        const pass_ = await bcrypt.hash(pass, 8);
        return pass_
    }
};

Schema.statics = {
    generateToken({ id }) {
        return jwt.sign({ id }, authConfig.secret, {
            expiresIn: authConfig.ttl
        });
    }
};

Schema.plugin(mongoosePaginate)
Schema.plugin(AutoIncrement, {inc_field: 'id_funcionario'});


module.exports = mongoose.model('funcionarios', Schema)