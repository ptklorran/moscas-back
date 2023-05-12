const express = require("express");
const mongoose = require("mongoose");
const cron = require("node-cron");
const cors = require("cors");
require('dotenv/config');

class App {
    constructor() {
        this.express = express();
        this.isDev = process.env.NODE_ENV !== "production";

        this.database()
        this.middlewares();
        this.routes();
    }

    database() {
        // mongoose.connect('mongodb+srv://default_ubs:pp!!4753@cluster0-xm2va.gcp.mongodb.net/cosmos_solaris?retryWrites=true', {
        mongoose.connect('mongodb://admin:!@#$%@localhost:27017', {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
    }

    middlewares() {
        // cron.schedule("* * * * *", () => require('./app/cron/check_plano_vencido.js')());
        // cron.schedule("* * * * *", () => require('./dp_script/base_parasitoid')());
        // cron.schedule("* * * * *", () => require('./dp_script/base_lonchaeidae')());
        this.express.use(express.json({ limit: '50mb' }));
        this.express.use(cors());
        this.express.use((req, res, next) => {
            res.set('X-Powered-By', 'PHP/7.1.7');
            next();
        });
    }

    routes() {
        this.http = require("http").createServer(this.express)
        const routes = require('./routes');
        this.express.use(routes);
    }
}

module.exports = new App().http;
