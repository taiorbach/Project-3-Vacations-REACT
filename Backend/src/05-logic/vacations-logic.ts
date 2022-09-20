import { OkPacket } from "mysql";
import ErrorModel from "../03-models/error-model";
import VacationModel from "../03-models/vacation-model";
import dal from "../04-dal/dal";
import {v4 as uuid} from "uuid"


async function getAllVacations(userId: string): Promise<VacationModel[]>{

    const sql = `SELECT DISTINCT
                V.*,
            EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId AND userId = ?) AS isFollowing,
            COUNT(F.userId) AS numOfFollowers
            FROM vacations as V LEFT JOIN followers as F
            ON V.vacationId = F.vacationId
            GROUP BY vacationId
            ORDER BY isFollowing DESC`
    const vacations = await dal.execute(sql , [userId])
    
    return vacations
}



async function getOneVacation(vacationId: number): Promise<VacationModel> {
    const sql = `SELECT
                vacationId,
                destination,
                description,
                startDate,
                endDate,
                price,
                imageName
                FROM vacations
                WHERE vacationId = ?`
    const vacations = await dal.execute(sql , [vacationId])
    const vacation = vacations[0]
    
    
    if(!vacation) throw new ErrorModel(404 , `vacation ${vacationId} not found`)

    return vacation
}



async function addVacation(vacation: VacationModel): Promise<VacationModel>{

    const errors = vacation.validatePost()
    if(errors) throw new ErrorModel(400 , errors)

    const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf("."))   
    vacation.imageName = uuid() + extension
    await vacation.image.mv("./src/assets/images/vacations/" + vacation.imageName) 
    delete vacation.image

    const sql = `INSERT INTO vacations(destination , description , imageName  , startDate , endDate , price)
                VALUES(?, ?, ?, ?, ?, ?) `

    const info: OkPacket = await dal.execute(sql , [vacation.destination , vacation.description, vacation.imageName , vacation.startDate, vacation.endDate , vacation.price])   
    vacation.vacationId = info.insertId

    
    return vacation
                
}

async function updateVacation(vacation: VacationModel): Promise<VacationModel> {

    const errors = vacation.validatePut()
    if(errors) throw new ErrorModel(400 , errors)

    
    const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf("."))   
    vacation.imageName = uuid() + extension
    await vacation.image.mv("./src/assets/images/vacations/" + vacation.imageName) 
    delete vacation.image

    const sql = `UPDATE vacations SET
                destination = ?,
                description = ?,
                imageName = ?,
                startDate = ?,
                endDate = ?,
                price = ?
                WHERE vacationId = ?`

    const info: OkPacket = await dal.execute(sql , [vacation.destination , vacation.description , vacation.imageName , vacation.startDate , vacation.endDate , vacation.price , vacation.vacationId])   

    if(info.affectedRows === 0) throw new ErrorModel(404 , `vacation ${vacation.vacationId} not found`)

    return vacation
}

async function deleteVacation(vacationId: number): Promise<void> {
    const sql = `DELETE FROM vacations WHERE vacationId = ?`
    const info: OkPacket = await dal.execute(sql , [vacationId])
    
    if(info.affectedRows === 0) throw new ErrorModel(404 , `vacation ${vacationId} not found` )
}



export default {
    getAllVacations,
    getOneVacation,
    addVacation,
    updateVacation,
    deleteVacation

};

