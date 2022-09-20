
import jwt from "jsonwebtoken"
import UserModel from "../03-models/user-model"
import * as bcrypt from "bcrypt"



function hash(plainText: string): string{

    if(!plainText) return null

    const hashedText = bcrypt.hashSync(plainText , 10)


    return hashedText
}



function verifyHash(password: string , hash) {
    return bcrypt.compareSync(password , hash)
}




const secretKey = "AwesomeLife"

function getNewToken(user: UserModel): string{
    
    const payload = {user}

    const token = jwt.sign(payload , secretKey , {expiresIn: "1h"})

    return token
}


function varifyToken(authorizationHeader: string): Promise<boolean> {

    return new Promise((res , rej) => {

        if(!authorizationHeader){
            res(false)
            return
        }

        const token = authorizationHeader.split(" ")[1]

        if(!token) {
            res(false)
            return
            
        }

        jwt.verify(token , secretKey , (err) => {

            if(err){
                res(false)
                return
            }

            res(true)
        })
    })
}

function getUserFromToken(authorizationHeader: string): UserModel {
    const token = authorizationHeader.split(" ")[1]

    const payload: any = jwt.decode(token)

    const user = payload.user

    return user
}







export default {
    hash,
    getNewToken,
    varifyToken,
    verifyHash,
    getUserFromToken
};