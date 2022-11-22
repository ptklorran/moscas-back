const express = require("express");

const routes = express.Router();

//public routes init
routes.post('/admin/ocorrencias/list', (req, res) => require('./app/useCases/5#Ocorrencias/admin').cases({
    body: req.body,
    params: {...req.params, case: 'list'}
}, res))
routes.post('/admin/bases/list', (req, res) => require('./app/useCases/7#Bases/admin').cases({
    body: req.body,
    params: {...req.params, case: 'list'}
}, res))
routes.post('/admin/especies/list', (req, res) => require('./app/useCases/0#Especies/admin').cases({
    body: req.body,
    params: {...req.params, case: 'list'}
}, res))
routes.post('/admin/familiahospedeiros/list', (req, res) => require('./app/useCases/4#FamiliaHospedeiros/admin').cases({
    body: req.body,
    params: {...req.params, case: 'list'}
}, res))
routes.post('/admin/hospedeiros/list', (req, res) => require('./app/useCases/3#Hospedeiros/admin').cases({
    body: req.body,
    params: {...req.params, case: 'list'}
}, res))

//public routes end
routes.post('/signup/:sponsor_id', (req, res) => require('./app/useCases/1#Funcionarios/cliente').cases(
    {
        body: req.body,
        params: {...req.params, case: 'create'}
    },
    res
))

routes.post('/signup', (req, res) => require('./app/useCases/1#Funcionarios/cliente').cases(
    {
        body: req.body,
        params: {...req.params, case: 'create'}
    },
    res
))

routes.post('/activate-account/:id', (req, res) => require('./app/useCases/1#Funcionarios/cliente').cases(
    {
        body: req.body,
        params: {...req.params, case: 'activate-account'}
    },
    res
))

routes.post('/forgot-password', (req, res) => require('./app/useCases/1#Funcionarios/cliente').cases(
    {
        body: req.body,
        params: {...req.params, case: 'forgot-password'}
    },
    res
))

routes.post('/forgot-password/:id', (req, res) => require('./app/useCases/1#Funcionarios/cliente').cases(
    {
        body: req.body,
        params: {...req.params, case: 'forgot-password-fire'}
    },
    res
))

routes.post('/signin', (req, res) => require('./app/useCases/1#Funcionarios/cliente').cases(
    {
        body: req.body,
        params:
        {
            case: 'create-session'
        }
    },
    res))

const authUserMiddlewares = require("./app/middlewares/auth");
routes.use(authUserMiddlewares);

// 1#Funcionarios
routes.post('/:permissao/funcionarios/:case', (req, res) => require('./app/useCases/1#Funcionarios/'+req.params.permissao).cases(req, res))

// 0#Especies
routes.post('/:permissao/especies/:case', (req, res) => require('./app/useCases/0#Especies/'+req.params.permissao).cases(req, res))

// 2#Especies
routes.post('/:permissao/especies_hospedeiros/:case', (req, res) => require('./app/useCases/2#EspeciesHospedeiro/'+req.params.permissao).cases(req, res))

// 3#Hospedeiros
routes.post('/:permissao/hospedeiros/:case', (req, res) => require('./app/useCases/3#Hospedeiros/'+req.params.permissao).cases(req, res))

// 4#FamiliaHospedeiros
routes.post('/:permissao/familiahospedeiros/:case', (req, res) => require('./app/useCases/4#FamiliaHospedeiros/'+req.params.permissao).cases(req, res))

// 5#Ocorrencias
routes.post('/:permissao/ocorrencias/:case', (req, res) => require('./app/useCases/5#Ocorrencias/'+req.params.permissao).cases(req, res))

// 6#ReferenciasBibliograficas
routes.post('/:permissao/referenciasbibliograficas/:case', (req, res) => require('./app/useCases/6#ReferenciasBibliograficas/'+req.params.permissao).cases(req, res))

// 7#Bases
routes.post('/:permissao/bases/:case', (req, res) => require('./app/useCases/7#Bases/'+req.params.permissao).cases(req, res))

module.exports = routes
