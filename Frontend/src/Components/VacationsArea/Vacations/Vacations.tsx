import { Button, ButtonGroup } from "@material-ui/core";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import store from "../../../Redux/store";
import authService from "../../../Services/AuthService";
import notify from "../../../Services/NotifyService";
import socketService from "../../../Services/SocketService";
import vacationService from "../../../Services/VacationsService";


import VacationCard from "../VacationCard/VacationCard";
import "./Vacations.css";

function Vacations(): JSX.Element {


    
    const [vacations , setVacations] = useState<VacationModel[]>([])
 
    const navigate = useNavigate()

    

    useEffect(() => {
        socketService.connect()
    } , [])

    useEffect(() => {
        vacationService.getAllVacations()
        .then(vacations => setVacations(vacations))
            // const newVacations: VacationModel[] = [...vacations];
            const unsubsribeMe = store.subscribe(() => {
                vacationService.getAllVacations()
                .then(vacations => setVacations([...vacations]))
             .catch(err => notify.error(err))

            })
        return () => unsubsribeMe()
        
    } , [])

   

    
    
    return (

        
        <div className="Vacations Nice">
                {authService.isLoggedIn() && authService.isAdmin()  ?
                <>
                
                <div className="admin-btn">
                <ButtonGroup variant="contained">
                <Button  color="primary" onClick={() => navigate("/vacations/chart")}>Followers Chart</Button>

                <Button startIcon={<AddCircleOutlineIcon/>}  color="primary" onClick={() => navigate("/vacations/new")}>Add Vacation</Button>
                </ButtonGroup>
                </div>

               
                
                    
                </>
                
                :
                
                <></>
                }
                 { authService.isLoggedIn  ?
                <>
                
                {vacations.map(v => <VacationCard key={v.vacationId} vacation={v}/>)}
                </>
                :
                <>
                 
                 <Navigate to={"/login"}></Navigate>
                 
                
               
                </>
                } 
                
        </div>
    );
}

export default Vacations;
