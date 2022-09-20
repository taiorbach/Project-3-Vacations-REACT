import { OkPacket } from "mysql"
import ErrorModel from "../03-models/error-model"
import dal from "../04-dal/dal"



async function followVacation(userId: string , vacationId: number): Promise<void>{
    const sql = `INSERT INTO followers(userId , vacationId)
                   VALUES(? , ?) `
   const info: OkPacket = await dal.execute(sql , [userId , vacationId])
   if(info.affectedRows === 0) throw new ErrorModel(404, `${vacationId}/${userId} not found `);
}


async function unfollowVacation(userId: string , vacationId: number ): Promise<void>{
    const sql = `DELETE FROM followers WHERE userId = ? AND vacationId = ?`
    const info: OkPacket = await dal.execute(sql , [userId , vacationId])
    if(info.affectedRows === 0) throw new ErrorModel(404, `${vacationId}/${userId} not found `);
}









export default {
    followVacation,
    unfollowVacation,
    
    
   
}