const estados = require('./estados.json')
const familia_hosp = require('./familia_hosp.json')
const hospedeiros = require('./hospedeiros.json')
const mosca_frutas = require('./mosca_frutas.json')
const mosca_genero = require('./mosca_genero.json')
const municipios = require('./municipios.json')
const ocorrencias = require('./ocorrencias.json')
const ref_bibliograficas = require('./ref_bibliograficas.json')

let ocorrencias_preenchidas = [];

// ocorrencias.map(ocorrencia => {
//   let payload = ocorrencia;
//   ocorrencias_preenchidas.push(payload)
// })

const EspecieDeMosca = require('../app/models/0#Especies')
const EspecieDeHospedeiro = require('../app/models/2#EspeciesHospedeiro')
const FamiliaDeHospedeiro = require('../app/models/4#FamiliaHospedeiro')
const Ocurrencie = require('../app/models/5#Ocorrencia')
let familias_de_hospedeiros = [];
let especies_de_hospedeiros = [];
let especies_de_moscas = [];
const id_base = '6446d611c1a52024a4c7f02e' //lonchaeidae;
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

module.exports = () => {
  console.log('as', base_parasitoid.length)
}
