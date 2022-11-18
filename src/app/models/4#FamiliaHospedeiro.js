const mongoose = require('mongoose')
const mongoosePaginate = require("mongoose-paginate-v2")
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = new mongoose.Schema({
    base: String,
    nome: String,
    created_at: {
        type: Date,
        default: new Date()
    },
    imagens: {
        type: Array,
        default: []
    },
    deleted: {
        type: Object,
        default: {
            status: 'no'
        }
    },
    updated_at: {
        type: Array,
        default: []
    }
})

Schema.plugin(mongoosePaginate)
Schema.plugin(AutoIncrement, {inc_field: 'id_familiahospedeiro'});

module.exports = mongoose.model('familiahospedeiros', Schema)
