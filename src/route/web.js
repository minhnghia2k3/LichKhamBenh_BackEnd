import express from "express";
import res from "express/lib/response";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage); // Get data
    router.get('/about', homeController.getAboutPage);


    return app.use("/", router);
}

module.exports = initWebRoutes; // Exports function