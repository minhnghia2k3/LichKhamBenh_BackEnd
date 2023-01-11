import db from "../models/index"
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
// export objects

// object: {
//     key: ''
//     value: ''
// }

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
}