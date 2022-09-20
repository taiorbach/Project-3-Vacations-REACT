import { Button, ButtonGroup, TextField, Typography } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notify from "../../../Services/NotifyService";

import "./Login.css";



function Login(): JSX.Element {



    const navigate = useNavigate()
    const { register , handleSubmit , formState} = useForm<CredentialsModel>()

    async function submit(credentials: CredentialsModel){
        try{
            await authService.login(credentials)
            
            notify.success("You are logged In!")
            navigate("/vacations")
        }
        catch(err: any){
            notify.error(err)
        }
    }
    

    return (
        <div className="Login">


            <form onSubmit={handleSubmit(submit)}>
            <Typography variant="h2" className="Headline">
               
                Login
            </Typography>
            <br/>
            <TextField label="Username" variant="outlined" className="InputBox" required {...register("username")}/>
            <TextField label="Password" variant="outlined" className="InputBox" required type="password" {...register("password")}/>

            <ButtonGroup variant="contained" fullWidth>
                <Button color="primary" type="submit" >Login</Button>
                <Button onClick={() => navigate("/register")} color="secondary">Register</Button>
            </ButtonGroup>
            

            </form>


			
        </div>
    );
}

export default Login;
