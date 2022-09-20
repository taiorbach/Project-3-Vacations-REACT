import { io, Socket } from "socket.io-client";
import vacationService from "./VacationsService";



class SocketService {
    private socket: Socket

    public connect (): void {

      this.socket = io("http://localhost:3001")
      this.socket.on("reload - admin" , () => {
          console.log("reload")
          vacationService.reloadAllVacations()
      })
    }

    public disconnect(): void {
        this.socket.disconnect()
    }

    public vacationChange(): void {
        this.socket.emit("change - client")
        console.log("service - vacation change")
    }
}

const socketService = new SocketService()


export default socketService