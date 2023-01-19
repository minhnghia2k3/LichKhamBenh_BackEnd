import db from "../models/index"
import CRUDservice from "../services/CRUDservice";
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homePage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
    }

}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}

let getCRUD = (req, res) => {
    return res.render("crud.ejs")
}

let postCRUD = async (req, res) => {
    let message = await CRUDservice.createNewUser(req.body);
    // Request tham so client -> server
    console.log(message);
    return res.send('post crud from server')
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDservice.getAllUser();
    console.log('================');

    console.log(data);
    console.log('================');

    return res.render("displayCRUD.ejs", {
        dataTable: data
    })
}
let getEditCRUD = async (req, res) => {
    let userID = req.query.id;
    if (userID) {
        let userData = await CRUDservice.getUserInfoByID(userID);
        // Check user data not found

        // x <- y
        return res.render("editCRUD.ejs", {
            user: userData
        });
    }
    else {
        return res.send('User not found!');

    }

}

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDservice.updateUserData(data);
    return res.render('displayCRUD.ejs', {
        dataTable: allUsers
    });
}


module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
}