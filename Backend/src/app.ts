
import dotenv from "dotenv";
dotenv.config(); 

import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import config from "./01-utils/config";
import errorsHandler from "./02-middleware/errors-handler";
import ErrorModel from "./03-models/error-model";
import vacationsController from "./06-controllers/vacations-controllers";
import expressFileUpload from "express-fileupload";
import sanitize from "./02-middleware/sanitize";
import authController from "./06-controllers/auth-controller"
import followersController from "./06-controllers/followers-controller"
import expressRateLimit from "express-rate-limit"
import socketLogic from "./05-logic/socket-logic";

const server = express();

server.use("/" , expressRateLimit({
    windowMs: 1000,
    max: 20,
    message: "Please try again later..."
}))

if (config.isDevelopment) server.use(cors());
server.use(express.json());
server.use(expressFileUpload())
server.use(sanitize)

server.use("/api", vacationsController);
server.use("/api", authController);
server.use("/api" , followersController)

server.use("*", (request: Request, response: Response, next: NextFunction) => {
    next(new ErrorModel(404, "Route not found."));
});

server.use(errorsHandler);

const httpServer = server.listen(process.env.PORT, () => console.log("Listening..."));

socketLogic(httpServer)


