import userService from "../services/userService";

let handleLogin = async (req, res) => {
    let email = req.body.email;
    console.log('your email: ', email);
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


module.exports = {
    handleLogin: handleLogin
}