import VacationModel from "../../../Models/VacationModel";
import "./VacationCard.css";
import authService from "../../../Services/AuthService";

import { Button, ButtonGroup, Card, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";
import config from "../../../Utils/Config";
import { useEffect, useState } from "react";
import vacationService from "../../../Services/VacationsService";
import notify from "../../../Services/NotifyService";
import AdminCard from "../AdminCard/AdminCard";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import Chip from '@mui/material/Chip';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';


            interface VacationCardProps {
              vacation: VacationModel
            }

            export function formatDate(date: string): string {
              const d = new Date(date)
              return d.toLocaleDateString()
            }



          function VacationCard(props: VacationCardProps): JSX.Element {



            const [numOfFollowers , setNumOfFollowers] = useState<number>(0)

            const [isFollowing , setIsFollowing] = useState<boolean>(false)

            
            useEffect(() => {
              
              if(props.vacation.isFollowing ){
                setIsFollowing(true)                
              } 
              else{
                setIsFollowing(false)                             
              }
              setNumOfFollowers(props.vacation.numOfFollowers)  
              
            } , [])

            
          

            function followVacation(): void {
            try{
              vacationService.followVacation(props.vacation.vacationId)
              setIsFollowing(!isFollowing)
              setNumOfFollowers(numOfFollowers+1)
              notify.success("Follow!") 
              
            }
            catch(err: any){
            notify.error(err)
            }
          }



         function unfollowVacation(): void {
          try{
          
              vacationService.unfollowVacation(props.vacation.vacationId)
              
              setIsFollowing(!isFollowing)
              setNumOfFollowers(numOfFollowers-1)
              
            notify.success("Unfollow!")
          }
          catch(err: any){
          notify.error(err)
          }
        }
 


    return (
        <div className="VacationCard Nice">
          
           {authService.isAdmin()

           ?
          
            <>
              <AdminCard vacation={props.vacation} />           
            </>
              :
            <>
          <Card >
            <CardMedia
              component="img"
              image={config.vacationsImageUrl + props.vacation.imageName}
            />
            <CardContent>
              <Typography  variant="h5" component="div">
               {props.vacation.destination}
              </Typography>
              <Typography variant="body2" >
               <b> {props.vacation.description} </b> 
                <br/>
                <br/>
                <FlightTakeoffIcon color="primary" /> <b>{formatDate(props.vacation.startDate)}</b>
                <br/>
                <FlightLandIcon color="primary"/> <b> {formatDate(props.vacation.endDate)}</b>
                <br/>
                <br/>
                <b>${props.vacation.price}</b>
                <br/>
                <br/>
                <b> <Chip label={numOfFollowers} color="secondary" /> Followers</b>
               
              </Typography>
            </CardContent>
            <div className="user-btn">
          <CardActions>
            
            <ButtonGroup variant="contained" > 

            
            {isFollowing  ?
            
            <Button size="large" color="primary"  startIcon={<ThumbDownIcon/>} onClick={unfollowVacation} className="action-btn">
            UnFollow
            </Button> 
             
            :
            <Button size="large" color="primary"  startIcon={<ThumbUpIcon/>} onClick={followVacation} className="action-btn">
            Follow
            </Button>
            
            }
          
             </ButtonGroup>
             
          </CardActions>
          </div>
        </Card>
       
        
      
      
    
  
      
            </>
            
            } 
           

			
        </div>
        
        
    );
}

export default VacationCard;
