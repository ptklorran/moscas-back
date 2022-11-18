const mongoose = require('mongoose')
const mongoosePaginate = require("mongoose-paginate-v2")
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = new mongoose.Schema({
    nome: {
        type: Object,
        default: {
            pt: "",
            en: "",
        }
    },
    link: {
        type: String,
        unique: true
    },
    img: String,
    // titulo: {
    //     type: Object,
    //     default: {
    //         pt: "",
    //         en: "",
    //     }
    // },
    subtitulo: {
        type: Object,
        default: {
            pt: "",
            en: "",
        }
    },
    descricao: {
        type: Object,
        default: {
            pt: "",
            en: "",
        }
    },
    colaboradores: {
        type: Array,
        default: []
    },
    autores: {
        type: Array,
        default: []
    },
    como_citar: String,
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
Schema.plugin(AutoIncrement, {inc_field: 'id_base'});

module.exports = mongoose.model('bases', Schema)
