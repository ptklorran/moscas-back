const mongoose = require('mongoose')
const mongoosePaginate = require("mongoose-paginate-v2")
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = new mongoose.Schema({
    base: String,
    autor: String,
    referencia: String,
    ano: Number,
    created_at: {
        type: Date,
        default: new Date()
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
Schema.plugin(AutoIncrement, {inc_field: 'id_referenciabibliografica'});

module.exports = mongoose.model('referenciasbibliograficas', Schema)
