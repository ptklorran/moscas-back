const estados = require('./estados.json')
const familia_hosp = require('./familia_hosp.json') // ok
const mosca_frutas = require('./mosca_frutas.json') // ok
const hospedeiros = require('./hospedeiros.json')
const mosca_genero = require('./mosca_genero.json')
const municipios = require('./municipios.json')
const ocorrencias = require('./ocorrencias.json')
const ref_bibliograficas = require('./ref_bibliograficas.json')

let ocorrencias_preenchidas = [];

// ocorrencias.map(ocorrencia => {
//   let payload = ocorrencia;
//   ocorrencias_preenchidas.push(payload)
// })

const FamiliaDeHospedeiro = require('../app/models/4#FamiliaHospedeiro') //ok
const EspecieDeMosca = require('../app/models/0#Especies') //ok
const EspecieDeHospedeiro = require('../app/models/2#EspeciesHospedeiro')
const Ocurrencie = require('../app/models/5#Ocorrencia')
let familias_de_hospedeiros = [];
let especies_de_hospedeiros = [];
let especies_de_moscas = [];


const id_base = '6446d611c1a52024a4c7f02e' //lonchaeidae;

module.exports = async () => {
    // familia_hosp.map(async fh => {
    //     await FamiliaDeHospedeiro.create({
    //         nome: fh.familia_hosp,
    //         base: id_base
    //     })
    // });
    // mosca_frutas.map(async fh => {
    //     await EspecieDeMosca.create({
    //         cod_esp: fh.cod_esp,
    //         nome: fh.especie,
    //         genero: fh.genero,
    //         base: id_base
    //     })
    // });
    // hospedeiros.map(async fh => {
    //     console.log('ads', fh)
    //     await EspecieDeHospedeiro.create({
    //         cod_hosp: fh.cod_hosp,
    //         nome_popular: fh.nome_hosp,
    //         nome: fh.esp_hosp,
    //         genero: fh.esp_hosp.split(' ')[0],
    //         base: id_base
    //     })
    // });
    let ocorrencia_treated = []
    ocorrencias.map(async oc => {
        let payload = {};
        payload.base = id_base,
        payload.nome = "",
        payload.especie = await EspecieDeMosca.findOne({ cod_esp: oc.cod_esp }),
        payload.especie_hospedeiro = await EspecieDeHospedeiro.findOne({ cod_hosp: oc.cod_hosp }),

        payload.tipo_localizacao = oc.coord_estimada === 1 ? 'Estimada' : 'Real';
        payload.latitude = {
            direcao: oc.latitude,
            grau: oc.lat_graus,
            minuto: oc.lat_min,
            segundo: oc.lat_seg || 0
        }
        payload.longitude = {
            direcao: oc.longitude,
            grau: oc.long_graus,
            minuto: oc.long_min,
            segundo: oc.long_seg || 0
        }

        payload.estado = oc.estado

        hospedeiros.map(async nf => {
            if (nf.cod_hosp == payload.especie_hospedeiro.cod_hosp) {
                payload.familia_hospedeiro = await FamiliaDeHospedeiro.findOne({ nome: nf.familia_hosp });
                return payload;
            }
        });
        ref_bibliograficas.map(rb => {
            if (rb.cod_ref === oc.cod_ref) {
                payload.referenciabibliografica = rb.referencia;
                payload.citacao = rb.autor;
                return payload;
            }
        })
        municipios.map(rb => {
            if (rb.cod_munic === oc.cod_munic) {
                payload.municipio = rb.municipio;
                return payload;
            }
        })
        ocorrencia_treated.push(payload);
    });
        // console.log("sdasd", ocorrencia_treated);
    setTimeout(() => {
        console.log("sdasd", ocorrencia_treated);
    }, 10000);
}
// module.exports = async () => {
//   try {
//     base_parasitoid.map(item => {
//       let payload_familia_hospedeiro = {
//         base: id_base
//       }
//       let payload_especie_hospedeiro = {
//         base: id_base
//       }
//       let payload_especie_mosca = {
//         base: id_base
//       }
//       if (item["Hospedeiro (NC)"]) {
//         payload_especie_hospedeiro.nome = item["Hospedeiro (NC)"]
//         payload_especie_hospedeiro.genero = item["Hospedeiro (NC)"].split(" ")[0]
//         if (!especies_de_hospedeiros.filter(i => i.nome === item.nome).length) {
//           especies_de_hospedeiros.push(payload_especie_hospedeiro);
//         }
//       }
//       if (item["Familia Hospedeiro"]) {
//         payload_familia_hospedeiro.nome = item["Familia Hospedeiro"]
//         if (!familias_de_hospedeiros.filter(i => i.nome === payload_familia_hospedeiro.nome).length) {
//           familias_de_hospedeiros.push(payload_familia_hospedeiro);
//         }
//       }
//       if (item["Parasitoid"]) {
//         payload_especie_mosca.nome = item["Parasitoid"]
//         payload_especie_mosca.genero = item["Parasitoid"].split(" ")[0]
//         if (!especies_de_moscas.filter(i => i.nome === payload_especie_mosca.nome).length) {
//           especies_de_moscas.push(payload_especie_mosca);
//         }
//       }
//     });

//     familias_de_hospedeiros.map(async item => {
//       await FamiliaDeHospedeiro.create(item);
//     })

//     especies_de_hospedeiros.map(async item => {
//       await EspecieDeHospedeiro.create(item)
//     })

//     especies_de_moscas.map(async item => {
//       await EspecieDeMosca.create(item);
//     })
//     console.log('success');
//     return 'success';
//   } catch (error) {
//     return error;
//   }
// }

// module.exports = async () => {
//   base_parasitoid.map(async item => {
//     try {

//     } catch (error) {

//     }
//     let payload_occurrencie = {
//       base: id_base,
//       especie: await EspecieDeMosca.findOne({ 'nome': item["Parasitoid"] }),
//       especie_hospedeiro: await EspecieDeHospedeiro.findOne({ 'nome': item["Hospedeiro (NC)"] }),
//       familia_hospedeiro: await FamiliaDeHospedeiro.findOne({ 'nome': item["Familia Hospedeiro"] }),
//       referenciabibliografica: item["Referência"],
//       citacao: item["Citação"],
//       tipo_localizacao: (item["Coord. Estimada"] === '*' || item["Coord. Estimada"] === '**') ? 'Estimada' : 'Real',
//       latitude: {
//         direcao: item["(N/S)"] || 'N',
//         grau: item["Graus"] || '0',
//         minuto: item["Min"] || '0',
//         segundo: item["Seg"] || '0',
//       },
//       longitude: {
//         direcao: 'W',
//         grau: item["Graus1"] || '0',
//         minuto: item["Min1"] || '0',
//         segundo: item["Seg1"] || '0',
//       },
//       estado: item["Estado"],
//       municipio: item["Município"],
//     }
//     const oc = await Ocurrencie.create(payload_occurrencie);
//     console.log("sucesso", oc._id);
//   });
// }

// module.exports = () => {
//   console.log('as', base_parasitoid.length)
// }
