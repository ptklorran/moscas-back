const estados = require('./estados.json')
const familia_hosp = require('./familia_hosp.json')
const hospedeiros = require('./hospedeiros.json')
const mosca_frutas = require('./mosca_frutas.json')
const mosca_genero = require('./mosca_genero.json')
const municipios = require('./municipios.json')
const ocorrencias = require('./ocorrencias.json')
const ref_bibliograficas = require('./ref_bibliograficas.json')

console.log('ocorrencias', ocorrencias)

let ocorrencias_preenchidas = [];

ocorrencias.map(ocorrencia => {
  let payload = ocorrencia;
  
  ocorrencias_preenchidas.push(payload)
})