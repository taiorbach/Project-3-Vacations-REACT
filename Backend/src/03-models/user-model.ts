import Joi from "joi"

class UserModel {
    public userId: string
    public firstName: string
    public lastName: string
    public username: string
    public password: string
    public role: number

    constructor(user: UserModel){
        this.userId = user.userId
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.username = user.username
        this.password = user.password
        this.role = user.role
    }

    private static schemaUser = Joi.object({
       
            userId: Joi.forbidden(),
            firstName: Joi.string().required().min(2).max(10),
            lastName: Joi.string().required().min(2).max(14),
            username: Joi.string().required().min(5).max(15),
            password: Joi.string().required().min(7).max(20),
            role: Joi.forbidden()
        
    })

    public validate(): string {
        const result = UserModel.schemaUser.validate(this)
        return result.error?.message
    }


}

export default UserModel