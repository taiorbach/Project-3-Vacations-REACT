import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import "./PageNotFound.css";

function PageNotFound(): JSX.Element {

    const navigate = useNavigate()
    return (
        <div className="PageNotFound">
			<h1>Oops! This page doesnt Exist</h1>
            <Button onClick={() => navigate(-1)}  variant="contained" color="primary">Back</Button> 

        </div>
    );
}

export default PageNotFound;
