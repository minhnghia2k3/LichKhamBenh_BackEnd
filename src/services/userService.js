import bcrypt from 'bcryptjs';
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

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

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //check email is exist?
            let check = await checkUserEmail(data.email);
            if (check) {
                resolve({
                    errCode: 1,
                    errMessage: "Your email already exist!"
                })
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender === '1' ? true : false,
                    // image: data.image,
                    roleID: data.roleID,
                    // positionID: data.positionID,
                })
            }
            resolve({
                errCode: 0,
                errMessage: "OK",
            })
        } catch (e) {
            reject(e)
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("check nodejs: ", data);
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: "Missing required parameters!"
                })
            }
            //check user
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false // return instance data
            })
            if (!user) {
                resolve({
                    errCode: 1,
                    errMessage: "User is not exist!"
                })
            } else {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save();
                // await db.User.save({
                //     email: data.email,
                //     firstName: data.firstName,
                //     lastName: data.lastName,
                //     address: data.address,
                // })
                resolve({
                    errCode: 0,
                    errMessage: "Update user success!"
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}

let deleteUser = async (userID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userID }
            })
            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: "User is not exist!"
                })
            } else {
                // Loi user.destroy is not a function => query: raw -> tra ve object { kieu sequelize la: instance}
                await db.User.destroy({
                    where: { id: userID }
                })
            }
            resolve({
                errCode: 0,
                errMessage: "Delete user success!"
            })
        } catch (e) {
            reject(e)
        }
    })
}

// Find by 'TYPE'
let getAllCodeService = async (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameters!'
                });
            } else {
                let res = {};
                let allcode = await db.Allcode.findAll({
                    where: { type: typeInput }
                });
                res.errCode = 0;
                res.data = allcode;
                resolve(res);
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    getAllCodeService: getAllCodeService,
} 