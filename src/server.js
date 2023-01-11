import express from "express";
import bodyParser from "body-parser"; // take params from users
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web.js";
import connectDB from "./config/connectDB";
require('dotenv').config(); // run process.env [line19]
// /user?id=7 - user body-parsers to get params from id#7


let app = express(); // instance off app express

//config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);
connectDB();

let port = process.env.PORT || 6969;
// port equal undefined => port = 6969

app.listen(port, () => {
    //callback function
    console.log("Backend nodejs is running on the port: " + port)
})
