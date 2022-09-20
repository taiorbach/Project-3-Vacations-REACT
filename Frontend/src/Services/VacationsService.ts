import axios from "axios"
import VacationModel from "../Models/VacationModel"
import store from "../Redux/store"
import { addVacationAction, deleteVacationAction,  followVacationAction,  getVacationsAction, unfollowVacationAction, updateVacationAction } from "../Redux/VacationState"
import config from "../Utils/Config"
import socketService from "./SocketService"



class VacationsService {

    public async getAllVacations(): Promise<VacationModel[]> {
        if(store.getState().vacationState.vacations.length === 0){
            const response = await axios.get<VacationModel[]>(config.vacationsUrl)
            const vacations = response.data
            store.dispatch(getVacationsAction(vacations))
        }
        
        return store.getState().vacationState.vacations 
}
    
    public async getOneVacation(vacationId: number): Promise<VacationModel>{
        let vacation = store.getState().vacationState.vacations.find(v => v.vacationId === vacationId)
        if(!vacation){
            const response = await axios.get<VacationModel>(config.vacationsUrl + vacationId)
            vacation = response.data
        }
        return vacation
    }

    public async deleteOneVacation(vacationId: number): Promise<void> {
        await axios.delete(config.vacationsUrl+vacationId)
        store.dispatch(deleteVacationAction(vacationId))
        socketService.vacationChange()
    }


    public async addVacation(vacation: VacationModel): Promise<VacationModel>{
        const formDate = new FormData()
        formDate.append("destination" , vacation.destination )
        formDate.append("description" , vacation.description )
        formDate.append("startDate" , vacation.startDate )
        formDate.append("endDate" , vacation.endDate )
        formDate.append("price" , vacation.price.toString() )
        formDate.append("image" , vacation.image.item(0) )
        


        const response = await axios.post<VacationModel>(config.vacationsUrl , formDate)
        const addedVacation = response.data
        store.dispatch(addVacationAction(addedVacation))
        socketService.vacationChange()
        return addedVacation

    }

    public async updateVacation(vacation: VacationModel): Promise<VacationModel>{
        const formData = new FormData()
        formData.append("destination" , vacation.destination )
        formData.append("description" , vacation.description )
        formData.append("startDate" , vacation.startDate )
        formData.append("endDate" , vacation.endDate )
        formData.append("price" , vacation.price.toString())
        formData.append("image" , vacation.image.item(0))

        const response = await axios.put<VacationModel>(config.vacationsUrl + vacation.vacationId , formData)
        const updatedVacation = response.data
        store.dispatch(updateVacationAction(updatedVacation))
        socketService.vacationChange()
        return updatedVacation
    }

    public async followVacation(vacationId: number ): Promise<void>{
       await axios.post(config.followersUrl + vacationId)  
      store.dispatch(followVacationAction(vacationId))
       
    }

    public async unfollowVacation(vacationId: number): Promise<void>{
        await axios.delete(config.followersUrl + vacationId)   
        store.dispatch(unfollowVacationAction(vacationId))
    }

   public async reloadAllVacations(): Promise<void>{
       const response = await axios.get<VacationModel[]>(config.vacationsUrl)
       const vacations = response.data
       store.dispatch(getVacationsAction(vacations))
    }
    

}
  

const vacationService = new VacationsService()

export default vacationService