import express from "express";
import bodyParser from "body-parser"; // take params from users
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web.js";
import connectDB from "./config/connectDB";
// import cors from 'cors';

require('dotenv').config(); // run process.env [line19]
// /user?id=7 - user body-parsers to get params from id#7


let app = express(); // instance off app express
// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


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
