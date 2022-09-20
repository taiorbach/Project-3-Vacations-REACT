import Joi from "joi"

class CredentialsModel {
    public username: string
    public password: string


    constructor(credentials: CredentialsModel){
        this.username = credentials.username
        this.password = credentials.password
    }


    private static schemaCredentials = Joi.object({
        username: Joi.string().required().min(5).max(15),
        password: Joi.string().required().min(7).max(20)
    })

    public validate(): string {
        const result = CredentialsModel.schemaCredentials.validate(this)
        return result.error?.message
    }
}

export default CredentialsModel