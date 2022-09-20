import cyber from "../01-utils/cyber";
import ErrorModel from "../03-models/error-model";
import UserModel from "../03-models/user-model";
import dal from "../04-dal/dal";
import {v4 as uuid} from "uuid"
import { OkPacket } from "mysql";
import CredentialsModel from "../03-models/credentials-model";
import RoleModel from "../03-models/role-model";




async function register(user: UserModel): Promise<string> {

    const errors = user.validate()
    if(errors) throw new ErrorModel(400 , errors)

    const isTaken = await isUsernameTaken(user.username)
    if(isTaken) {
        throw new ErrorModel(400 , `${user.username} already exist`)
    }

    user.password = cyber.hash(user.password)

   user.userId = uuid()

   user.role = RoleModel.User

   const sql = `INSERT INTO users VALUES(?, ? , ? , ? , ? , ?)`

   const info: OkPacket = await dal.execute(sql , [user.userId, user.firstName , user.lastName , user.username , user.password , user.role])

   delete user.password

   const token = cyber.getNewToken(user)

   return token
}


async function login(credentials: CredentialsModel): Promise<string> {

    const errors = credentials.validate()
    if(errors) throw new ErrorModel(400 , errors)

    // credentials.password = cyber.hash(credentials.password)

    

    const sql = `SELECT * FROM users WHERE username = ? `
    const users = await dal.execute(sql , [credentials.username , credentials.password])

    if(users.length === 0 ) {
        throw new ErrorModel(401 , "incorrect username or password")
    }

    const user = users[0]

    const isHashValid = cyber.verifyHash(credentials.password , user.password)

    if(!isHashValid) {
        throw new ErrorModel(401 , "incorrect username or password")
    }

    delete user.password

    const token = cyber.getNewToken(user)

    return token

}







async function isUsernameTaken(username: string) : Promise<boolean> {
    const sql = `SELECT COUNT(*) as count FROM users WHERE username = ?`
    const table = await dal.execute(sql , [username])
    const row = table[0]
    const count = row.count
    return count > 0
}



export default {
    register,
    login

}