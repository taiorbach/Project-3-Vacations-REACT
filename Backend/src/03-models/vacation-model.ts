import { UploadedFile } from "express-fileupload"
import Joi from "joi"

class VacationModel {
    public vacationId: number
    public destination: string
    public description: string
    public imageName: string
    public image: UploadedFile
    public startDate: string
    public endDate: string
    public price: number
    public numFollowers: number
   
    
   
    

    public constructor(vacation: VacationModel){
        this.vacationId = vacation.vacationId
        this.destination = vacation.destination
        this.description = vacation.description
        this.image = vacation.image
        this.startDate = vacation.startDate
        this.endDate = vacation.endDate
        this.price = vacation.price
        this.numFollowers = vacation.numFollowers
       
    }

    private static postSchema = Joi.object({
        vacationId: Joi.forbidden(),
        destination: Joi.string().required().min(3).max(100),
        description: Joi.string().required().min(5).max(1000),
        imageName: Joi.string().optional(),
        image: Joi.object().optional(),
        startDate: Joi.string().required(),
        endDate: Joi.string().required(),
        price: Joi.number().required().min(1),
        numFollowers: Joi.forbidden()
        
    })

    private static putSchema = Joi.object({
        vacationId: Joi.number().required().integer().min(1),
        destination: Joi.string().required().min(3).max(100),
        description: Joi.string().required().min(5).max(1000),
        imageName: Joi.string().optional(),
        image: Joi.object().optional(),
        startDate: Joi.string().required(),
        endDate: Joi.string().required(),
        price: Joi.number().required().min(1),
        numFollowers: Joi.forbidden()
    })


    public validatePost(): string {
        const result = VacationModel.postSchema.validate(this)
        return result.error?.message
    }

    public validatePut(): string {
        const result = VacationModel.putSchema.validate(this)
        return result.error?.message
    }

}

export default VacationModel