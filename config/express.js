"use strict";
exports.express = {
    customMiddleware: function (app) {
        app.use(function hsts(req, res, next) {
            res.setHeader("X-Powered-By", "Grupo 3 <<GeekShirt>>");
            next();
        });
    }
}