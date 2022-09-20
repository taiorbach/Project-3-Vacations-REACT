import { Server as HttpServer } from "http";
import { Server as SocketIoServer , Socket} from "socket.io"


function socketLogic(httpServer: HttpServer): void {
    const socketIoServer = new SocketIoServer(httpServer, {cors: {origin: "http://localhost:3000"}})

    socketIoServer.sockets.on("connection" , (socket: Socket) => {
        console.log("client has been connected")

        socket.on("change - client", () => {
            socketIoServer.sockets.emit("reload - admin")
            console.log("logic --- admin change")
        })

        socket.on("disconnect" , () => {
            console.log("client has been disconnected")
        })
    })
}




export default socketLogic