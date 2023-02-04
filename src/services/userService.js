import bcrypt from 'bcryptjs';
import db from "../models/index";

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                // user already exist

                // ====compare password===
                let user = await db.User.findOne({
                    where: { email: email },
                    attributes: ['email', 'roleID', 'password'],
                    raw: true // get raw data from db

                })
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'OK';
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password!';

                    }
                } else {
                    userData.errorCode = 2;
                    userData.errMessage = `User's not found!'`
                    resolve(userData);
                }


            } else {
                // ===return error===
                userData.errorCode = 1;
                userData.errMessage = `Your's email isn't exist in our system! Try another email!`

            }
            resolve(userData);
        } catch (e) {
            reject(e)
        }
    })

}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }

        } catch (e) {
            reject(e);
        }
    })
}

let getAllUsers = (userID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userID === "ALL") {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            } else if (userID && userID != "ALL") {

                users = await db.User.findOne({
                    where: { id: userID },
                    attributes: {
                        exclude: ['password']
                    }
                })

            }
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers
}