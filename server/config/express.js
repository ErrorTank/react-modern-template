const express = require("express");
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");

const configExpressServer = ({useCors = false}) => {
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json({
        limit: '2mb'
    }));
    if (useCors) {
        app.use(cors());
    }
    app.use(helmet());
    app.use(compression());
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
        if (req.method === "OPTIONS") {
            res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
            return res.status(200).json({});
        }
        next();
    });
    let uploadDir = process.cwd() + "/" + process.env.UPLOAD_DIR;
    app.use("/", express.static(process.cwd() + "/" + process.env.STATIC_DIR));

    app.use("/uploads", express.static(uploadDir));
    app.use("*", (req, res, next) => {
        if (/^\/api\//.test(req.originalUrl)) {
            next();
        } else {
            res.sendFile(process.cwd() + "/" + process.env.HTML_DIR);
        }
    });


    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    if (!fs.existsSync(uploadDir + "/img")) {
        fs.mkdirSync(uploadDir + "/img");
    }
    return app;
};


module.exports = configExpressServer;
