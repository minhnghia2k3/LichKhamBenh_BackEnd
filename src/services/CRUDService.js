import db from "../models/index"
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
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
            resolve('Create a new user success!');
        } catch (e) {
            reject(e);
        }
    })

}

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

let getAllUser = () => {
    // Chờ Promise xử lý xong -> chạy tiếp (Javascript bất đồng bộ)
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true
            });
            resolve(users);
        } catch (e) {
            reject(e);
        }

    })
}

let getUserInfoByID = (userID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userID },
                raw: true

            })
            if (user) {
                resolve(user)

            } else {
                resolve([])
            }

        } catch (e) {
            reject(e);
        }

    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save();
                let allUsers = await db.User.findAll();
                resolve(allUsers);
            } else {
                resolve();
            }
            await db.User.update({

            })
        } catch (e) {
            reject(e);
        }
    })
}

let deleteUserByID = (userID) => {
    return new Promise(async (resolve, reject) => {
        // x <- y
        try {
            let user = await db.User.findOne({
                where: { id: userID }
            })

            if (user) {
                await user.destroy();

            }
            resolve(); // == return;
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoByID: getUserInfoByID,
    updateUserData: updateUserData,
    deleteUserByID: deleteUserByID,
}