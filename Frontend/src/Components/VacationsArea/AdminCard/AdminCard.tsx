import { Edit } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, CardMedia, Chip, Typography } from "@mui/material";
import VacationModel from "../../../Models/VacationModel";
import config from "../../../Utils/Config";
import "./AdminCard.css";
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import vacationService from "../../../Services/VacationsService";
import notify from "../../../Services/NotifyService";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import { useEffect, useState } from "react";


interface VacationCardProps {
    vacation: VacationModel
}

 export function formatDate(date: string): string {
    const d = new Date(date)
    return d.toLocaleDateString()
}



function AdminCard(props: VacationCardProps): JSX.Element {


    const navigate = useNavigate()


    const [numOfFollowers , setNumOfFollowers] = useState<number>(0)

    useEffect(() => {
              
     
      setNumOfFollowers(props.vacation.numOfFollowers)  
      
    } , [])


    async function deleteVacation(vacationId: any) {
        try{
              await vacationService.deleteOneVacation(vacationId)
             notify.success('Vacation deleted')
              navigate("/vacations")
              
        }
        catch(err: any){
         notify.error(err)
        }
    }


    return (
      
        <div className="AdminCard Nice">
          
          
                    <Card >
                <CardMedia
                  component="img"
                  image={config.vacationsImageUrl + props.vacation.imageName}
                />
                <CardContent>
                  <Typography  variant="h5" component="div">
                  {props.vacation.destination}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  <b> {props.vacation.description}
                  <br/>
                  <br/>
                    <FlightTakeoffIcon color="primary" /> {formatDate(props.vacation.startDate)}
                <br/>
                <FlightLandIcon color="primary"/> {formatDate(props.vacation.endDate)}
                <br/>
                <br/>
                    ${props.vacation.price}
                    <br/>
                <br/>
                <b> <Chip label={numOfFollowers} color="secondary" /> Followers</b>
                </b>
                  </Typography>
                </CardContent>
              <CardActions className="editDeleteBtn" >
              <Button size="large" color="primary" variant="contained" startIcon={<Edit/>} onClick={() => navigate("/vacations/edit/" + props.vacation.vacationId)}>
               EDIT
                </Button>
                
                <Button size="large" color="primary" variant="contained" startIcon={<DeleteIcon/>} onClick={async () => await deleteVacation(props.vacation.vacationId)}>
                DELETE
                </Button>
              </CardActions>
            </Card>   
           
        </div>
    );
}

export default AdminCard;
