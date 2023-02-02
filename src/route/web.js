import express from "express";
import res from "express/lib/response";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController"

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage); // Get data
    router.get('/about', homeController.getAboutPage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD); // achor tag => use method get

    router.post('/api/login', userController.handleLogin);



    return app.use("/", router);
}

module.exports = initWebRoutes; // Exports function