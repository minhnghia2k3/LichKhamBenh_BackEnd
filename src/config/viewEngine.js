import express from "express";
// import packet express

let configViewEngine = (app) => {
    // Arrow function
    app.use(express.static("./src/public")) // server can take picture as ./src/public
    app.set("view engine", "ejs"); // same as jsp (Java), blade (PHP)=> logic in HTML (if/else/loop)
    app.set("views", "./src/view"); // config view engine.


}

module.exports = configViewEngine; // export function