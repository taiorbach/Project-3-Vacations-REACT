import { Button, ButtonGroup, TextField, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import notify from "../../../Services/NotifyService";
import vacationService from "../../../Services/VacationsService";
import "./UpdateVacation.css";
import moment from "moment"


 function UpdateVacation(): JSX.Element {

    const params = useParams()
    const vacationId = +params.vacationId
    const navigate = useNavigate()

    const [ wrongDate , setWrongDate ] = useState<boolean>(false)
    const [ today , setToday] = useState<string>("")

    const {register , handleSubmit , formState , setValue , watch} = useForm<VacationModel>()

   
    useEffect(() => {
        const today = new Date().toLocaleDateString()

        setToday(today)
    } , [])

     useEffect(() => {
        
         vacationService.getOneVacation(vacationId)
      
        .then(vacation => {
            setValue("destination" , vacation.destination)
            setValue("description" , vacation.description)
            setValue("startDate" , moment(vacation.startDate).format("yyyy-MM-DD"))
            setValue("endDate" , moment(vacation.endDate).format("yyyy-MM-DD"))
            setValue("price" , vacation.price)
           
            
            
        })
        .catch(err => notify.error)
    } , [])

    async function submit(vacation: VacationModel){
        try{
            if(watch('startDate') > watch('endDate')){
                setWrongDate(true)
                notify.error("Wrong dates")
                return
            }
            setWrongDate(false)
                vacation.vacationId = vacationId
                await vacationService.updateVacation(vacation)

                notify.success("Vacation has been updated!")
                navigate("/vacations")

        }
        catch(err: any){
            notify.error(err)
        }
    }


    return (
        <div className="UpdateVacation Nice">
			  <form onSubmit={handleSubmit(submit)} noValidate>

    <Typography variant="h5" className="Headline">
    Update Vacation
    </Typography>  
    <hr/> 
    
    <label><b>Destination: </b></label>
    <TextField  variant="outlined" className="InputBox" required {...register("destination")}/>
    <label><b>Description: </b></label>
    <TextField  variant="outlined" className="InputBox" required {...register("description")}/>
    <label><b>Start: </b></label>
    <TextField  variant="outlined" className="InputBox" required type="date"{...register("startDate")}/>
    <label><b>End:</b> </label>
    <TextField   variant="outlined" className="InputBox" required type="date"{...register("endDate")}/>
    <label><b>Price: </b></label>
    <TextField  variant="outlined" className="InputBox" required  {...register("price")}/>
    <label><b>Image: </b></label>
    <TextField     variant="outlined" className="InputBox" required  type="file" inputProps={{accept: "image/*"}} {...register("image")}/>
    <ButtonGroup variant="contained" fullWidth>

    <Button type="submit" color="primary" >Update</Button>
    </ButtonGroup>


    </form>
            </div>
        );
    }

    export default UpdateVacation;
