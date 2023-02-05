import userService from "../services/userService";

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    //check email exist
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        })
    }// is email or password null?
    let userData = await userService.handleUserLogin(email, password);
    //check password wrong

    //return userInfor

    // access token: JWT json web token
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData ? userData.user : {},

    }) // API 200 is normal; 500 is error
}

let handleGetAllUser = async (req, res) => {
    let id = req.query.id; //all, id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters",
            users: []
        })
    }
    else {
        let users = await userService.getAllUsers(id);
        return res.status(200).json({
            errCode: 0,
            errMessage: "OK",
            users: users
        })
    }


}


module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser,
}