const mongoose = require('mongoose')
const mongoosePaginate = require("mongoose-paginate-v2")
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = new mongoose.Schema({
    base: String,
    nome: String,
    especie: {
        type: Object,
        default: {}
    },
    hospedeiro: {
        type: Object,
        default: {}
    },
    referenciabibliografica: String,
    citacao: String,
    imagens: {
        type: Array,
        default: []
    },
    latitude: String,
    longitude: String,
    estado: String,
    municipio: String,
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
Schema.plugin(AutoIncrement, {inc_field: 'id_ocorrencia'});

module.exports = mongoose.model('ocorrencias', Schema)
