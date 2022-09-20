import {  Navigate, Route, Routes } from "react-router-dom";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Register from "../../AuthArea/Register/Register";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import FollowersChart from "../../VacationsArea/FollowersChart/FollowersChart";
import UpdateVacation from "../../VacationsArea/UpdateVacation/UpdateVacation";
import Vacations from "../../VacationsArea/Vacations/Vacations";
import PageNotFound from "../PageNotFound/PageNotFound";
import "./Routing.css";

function Routing(): JSX.Element {

    
   

        


    return (
        <div className="Routing">

            <Routes>

            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/logout" element={<Logout/>} />
            <Route path="/vacations" element={<Vacations/>} />
            <Route path="/vacations/chart" element={<FollowersChart/>}/>

            <Route path="/vacations/new" element={<AddVacation/>} />
            <Route path="/vacations/edit/:vacationId" element={<UpdateVacation/>} />
            
            <Route path="/" element={<Navigate to={"/login"}/>}/>

            

            <Route path="*" element={<PageNotFound/>}/>






            </Routes>
			
        </div>
    );
}

export default Routing;
