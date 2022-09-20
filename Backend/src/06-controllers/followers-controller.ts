import express, { NextFunction, Request, Response } from "express";
import cyber from "../01-utils/cyber";
import followersLogic from "../05-logic/followers-logic";



const router = express.Router()

router.post("/followers/:vacationId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        let authorizationString = request.headers['authorization'];
        const userId = cyber.getUserFromToken(authorizationString).userId;
        const vacationId = +request.params.vacationId
        await followersLogic.followVacation(userId , vacationId)
        response.status(201).send()

    }
    catch(err: any) {
        next(err);
    }
});

router.delete("/followers/:vacationId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        let authorizationString = request.headers['authorization'];
        const userId = cyber.getUserFromToken(authorizationString).userId;
        const vacationId = +request.params.vacationId
        await followersLogic.unfollowVacation(userId , vacationId)
        response.sendStatus(204)
    }
    catch(err: any) {
        next(err);
    }
});





export default router