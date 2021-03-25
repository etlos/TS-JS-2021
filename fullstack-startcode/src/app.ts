import express from "express";
import dotenv from "dotenv";
import path from "path"
dotenv.config()
import logger, { stream } from "./middleware/logger";
import FriendsRoutes from "./routes/FriendRoutes"
import { Request, Response, NextFunction } from "express"
import { ApiError } from "./errors/APIErrors"
import cors from "cors"
//import  CORS  from "./middleware/myCors"
const debug = require("debug")("app")

const app = express()
const morganFormat = process.env.NODE_ENV == "production" ? "combined" : "dev"

app.use(express.json())
app.use(require("morgan")(morganFormat, { stream }));
logger.log("info", "Server started");

/*SIMPLE LOGGER
app.use((req,res,next) => {
  debug(new Date().toLocaleDateString(), req.method , req.originalUrl, req.ip) 
  next()
})*/

//Makes public folder accessable
app.use(express.static(path.join(process.cwd(), "public")))

//CORS
app.use(cors())

//Friends part of API
app.use("/api/friends",FriendsRoutes)

//Demo endpoint
//Auth first
app.get("/demo", (req, res) => {
  let a = 124;
  console.log(a)
  res.send("You reached the demo endpoint");
})

//Our own default 404-handler for api-requests
app.use("/api", (req: any, res: any, next) => {
  res.status(404).json({ errorCode: 404, msg: "not found" })
})

//Makes JSON error-response for ApiErrors, otherwise pass on to default error handleer
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof (ApiError)) {
    res.status(err.errorCode).json({ errorCode: 404, msg: err.message })
  } else {
    next(err)
  }
})

export default app;