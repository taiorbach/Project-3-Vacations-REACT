import UserModel from "../Models/UserModel";
import axios from "axios"
import config from "../Utils/Config";
import store from "../Redux/store"
import { loginAction, logoutAction, registerAction } from "../Redux/AuthState";
import CredentialsModel from "../Models/CredentialsModel";
import { getVacationsAction } from "../Redux/VacationState";
import socketService from "./SocketService";



class AuthService {

    public async register(user: UserModel): Promise<void> {
        const response = await axios.post<string>(config.registerUrl, user)
        const token = response.data
        store.dispatch(registerAction(token))
        
    }

    public async login(credentials: CredentialsModel): Promise<void> {
        const response = await axios.post<string>(config.loginUrl , credentials)
        const token = response.data
        store.dispatch(loginAction(token))
    }


    public logout(): void {
        store.dispatch(logoutAction())
        store.dispatch(getVacationsAction([]))
        socketService.disconnect()
    }


    public  isLoggedIn(): boolean{
        if(localStorage.getItem("token")){
            return true
        }
        else{
            return false
        }
    }

    
   public  isAdmin(): boolean {
        if(store.getState().authState.user.role === 1){
          return true
        }
        else {
          return false
        }
      }
    
}

const authService = new AuthService()
export default authService
