import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import notify from "../../../Services/NotifyService";
import { Button, ButtonGroup, TextField, Typography } from "@material-ui/core";
import "./Register.css";

function Register(): JSX.Element {

    const navigate = useNavigate()
    const {register , handleSubmit , formState} = useForm<UserModel>()

    async function submit(user: UserModel){
        try{
            await authService.register(user)

            notify.success("Register succeeds")
            navigate("/login")
        }
        catch(err: any) {
            notify.error(err)
        }
    }


    return (
        <div className="Register">

           <form onSubmit={handleSubmit(submit)}>
            <Typography variant="h2" className="Headline">
               
                Register
            </Typography>

            <TextField label="First Name: " variant="outlined" className="InputBox" required {...register("firstName")}/>
            <TextField label="Last Name: " variant="outlined" className="InputBox" required {...register("lastName")}/>
            <TextField label="Username: " variant="outlined" className="InputBox" required {...register("username")}/>
            <TextField label="Password: " variant="outlined" className="InputBox" required type="password" {...register("password")}/>

            <ButtonGroup variant="contained" fullWidth>
                <Button type="submit" color="secondary">Register</Button>
            </ButtonGroup>
            </form>
			
        </div>
    );
}

export default Register;
