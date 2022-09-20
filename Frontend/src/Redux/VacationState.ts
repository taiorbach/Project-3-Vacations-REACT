import VacationModel from "../Models/VacationModel";

export class VacationState {
    public vacations: VacationModel[] = []
    
    
    
}

export enum VacationsActionType {
    GetVacations = "GetVacations",
    AddVacation = "AddVacation" ,
    UpdateVacation = "UpdateVacation" ,
    DeleteVacation = "DeleteVacation",
    FollowVacation = "FollowVacation",
    UnfollowVacation = "UnfollowVacation"
    
}

export interface VacationAction {
    type: VacationsActionType
    payload: any
}

export function getVacationsAction(vacations: VacationModel[]): VacationAction{
    return {type: VacationsActionType.GetVacations , payload: vacations}
}

export function addVacationAction(vacation: VacationModel): VacationAction{
    return {type:VacationsActionType.AddVacation , payload: vacation}
}

export function updateVacationAction(vacation: VacationModel): VacationAction{
    return {type:VacationsActionType.UpdateVacation , payload: vacation}
}

export function deleteVacationAction(vacationId: number): VacationAction{
    return {type: VacationsActionType.DeleteVacation , payload: vacationId}
}

export function followVacationAction(vacationId: number): VacationAction{
    return {type: VacationsActionType.FollowVacation , payload: vacationId}
}

export function unfollowVacationAction(vacationId: number): VacationAction{
    return {type: VacationsActionType.UnfollowVacation , payload: vacationId}
}



export function vacationReducer( currentState = new VacationState() , action: VacationAction): VacationState{

    const newState = {...currentState}

    switch(action.type){
        case VacationsActionType.GetVacations:
            newState.vacations = action.payload
            break
        case VacationsActionType.AddVacation:
            newState.vacations.push(action.payload)
            break
        case VacationsActionType.UpdateVacation:
            const indexToUpdate = newState.vacations.findIndex(v => v.vacationId === action.payload.vacationId)
            if(indexToUpdate >= 0){
                newState.vacations[indexToUpdate] = action.payload
            } 
            break 
        case VacationsActionType.DeleteVacation:
            const indexToDelete = newState.vacations.findIndex(v => v.vacationId === action.payload)
            if(indexToDelete >= 0) {
                newState.vacations.splice(indexToDelete, 1)
            }          
            break
        case VacationsActionType.FollowVacation:
                const indexToFollow = newState.vacations.findIndex(v => v.vacationId === action.payload)
                if(indexToFollow >= 0) {
                    newState.vacations[indexToFollow].isFollowing = true
                }          
                break 
        case VacationsActionType.UnfollowVacation:
                    const indexToUnfollow = newState.vacations.findIndex(v => v.vacationId === action.payload)
                    if(indexToUnfollow >= 0) {
                        newState.vacations[indexToUnfollow].isFollowing = false
                    }          
                 break     
    }

    return newState
}