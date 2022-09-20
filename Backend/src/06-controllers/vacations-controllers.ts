import express, { NextFunction, Request, Response } from "express";
import verifyAdmin from "../02-middleware/varify-admin";
import verifyLoggedIn from "../02-middleware/verify-logged-in";
import VacationModel from "../03-models/vacation-model";
import vacationsLogic from "../05-logic/vacations-logic";
import path from "path"
import cyber from "../01-utils/cyber";


const router = express.Router();


router.get("/vacations",verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        let authorizationString = request.headers['authorization'];
        const userId = cyber.getUserFromToken(authorizationString).userId;
        const vacations = await vacationsLogic.getAllVacations(userId)
        response.json(vacations)
       
        
    }
    catch (err: any) {
        next(err);
    }
});


router.get("/vacations/:vacationId",verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId
        const vacation = await vacationsLogic.getOneVacation(vacationId)
        response.json(vacation)
        
    }
    catch (err: any) {
        next(err);
    }
});


router.post("/vacations",verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image
        const vacation = new VacationModel(request.body)
        const addedVacation = await vacationsLogic.addVacation(vacation)
        response.status(201).json(addedVacation)
       
    }
    catch (err: any) {
        next(err);
    }
});


router.put("/vacations/:vacationId",verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId
        request.body.image = request.files?.image
        request.body.vacationId = vacationId
        const vacation = new VacationModel(request.body)
        const updatedVacation = await vacationsLogic.updateVacation(vacation)
        response.json(updatedVacation)
    }
    catch (err: any) {
        next(err);
    }
});

router.delete("/vacations/:vacationId",verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId
        await vacationsLogic.deleteVacation(vacationId)
        response.sendStatus(204)
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/vacations/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName
        const absolutePath = path.join(__dirname , ".." , "assets" , "images" , "vacations" , imageName)
        response.sendFile(absolutePath)
    }
    catch (err: any) {
        next(err);
    }

})



export default router;