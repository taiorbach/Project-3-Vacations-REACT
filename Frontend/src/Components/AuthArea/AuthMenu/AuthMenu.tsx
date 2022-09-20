import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";

import {  useNavigate} from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/store";

import LogoutIcon from '@mui/icons-material/Logout';
import "./AuthMenu.css";



function AuthMenu(): JSX.Element {

   const navigate = useNavigate()

    const [user , setUser] = useState<UserModel>(null)

    useEffect(() => {
        setUser(store.getState().authState.user)

        const unsubscribeMe = store.subscribe(() => {
            setUser(store.getState().authState.user)
        })
        
        return () => unsubscribeMe()

    } , [])


    return (
        <div className="AuthMenu">

          {user  ? 
            <>
            <span ><b>Hello , {user.firstName}</b></span>
            <br/>
            <Button onClick={ () => navigate("/logout")} startIcon={<LogoutIcon/>}>logout </Button> 
                
               
            </>
            :
                <>
                
                
                
                 

                </>
            
          
           
        
            
            
            
           
}
       
			
        </div>
    );
}

export default AuthMenu;
