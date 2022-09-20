import { Notyf } from "notyf"

class NotifyService {
    private notification = new Notyf({duration: 4500 , position: { x: "right" , y: "bottom"}})

    public success(message: string): void{
        this.notification.success(message)
    }

    public error(err: any): void {
        const message = this.extractError(err)
        this.notification.error(message)
    }


    private extractError(err: any): string {
        if(typeof err === "string") return err
        if(typeof err.response?.data === "string") return err.response.data
        if(Array.isArray(err.response?.data)) return err.response.data[0]
        if(typeof err.message === "string") return err.message

        return "Some error, please try later..."
    }
}


const notify = new NotifyService()
export default notify