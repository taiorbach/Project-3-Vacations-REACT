import { Button, ButtonGroup, TextField, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import notify from "../../../Services/NotifyService";
import vacationService from "../../../Services/VacationsService"
import "./AddVacation.css"

function AddVacation(): JSX.Element {

    const [ wrongDate , setWrongDate ] = useState<boolean>(false)
    const [ today , setToday] = useState<string>("")

    const {register , handleSubmit , formState , watch} = useForm<VacationModel>()

    const navigate = useNavigate()

    useEffect(() => {
        const today = new Date().toLocaleDateString()

        setToday(today)
    } , [])

    async function submit(vacation: VacationModel){
        try{
            if(watch('startDate') > watch('endDate')){
                setWrongDate(true)
                notify.error("Wrong dates")
                return
            }
            setWrongDate(false)
            await vacationService.addVacation(vacation)
            notify.success("vacation has been added!")
            navigate("/vacations")
        }
        catch(err: any){
            notify.error(err)
        }
    }


    return (
        <div className="AddVacation Nice">

            <form onSubmit={handleSubmit(submit)} noValidate>

                 <Typography variant="h5" className="Headline">
                    Add Vacation
                 </Typography>   
                 <hr/>
                 <label><b>Destination: </b></label>
                <TextField  variant="outlined" className="InputBox" required {...register("destination")}/>
                <label><b>Description: </b></label>
                <TextField  variant="outlined" className="InputBox" required {...register("description")}/>
                <label><b>Start: </b></label>
                <TextField  variant="outlined" className="InputBox" required type="date" inputProps={{min: today}}{...register("startDate")}/>
                <label><b>End:</b> </label>
                <TextField   variant="outlined" className="InputBox" required type="date"{...register("endDate")}/>
                <label><b>Price: </b></label>
                <TextField  variant="outlined" className="InputBox" required  {...register("price")}/>
                <label><b>Image: </b></label>
                <TextField     variant="outlined" className="InputBox" required  type="file" inputProps={{accept: "image/*"}} {...register("image")}/>

                <ButtonGroup variant="contained" fullWidth>
                <Button type="submit" color="primary" >Add</Button>
                </ButtonGroup>
                

            </form>

			
        </div>
    );
}

export default AddVacation;
