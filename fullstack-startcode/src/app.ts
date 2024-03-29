import express from "express";
import { Request, Response, NextFunction } from "express"
import dotenv from "dotenv";
import path from "path"
import { ApiError } from "./errors/errors"
import cors from "cors"
import { graphqlHTTP } from 'express-graphql';
import { schema } from './graphql/schema';
import authMiddleware from "./middleware/basic-auth"
import friendsRoutes from "./routes/friendRoutesAuth";
//import friendsRoutes from "./routes/friendRoutes";

dotenv.config()
const debug = require("debug")("app")

/*HERE WE MAKE THE SERVER*/
const app = express()

/*USING MIDDLEWARE TO IMPLEMENT CORS*/
app.use(cors())

app.use(express.json())

//SIMPLE LOGGER
//Please verify whether this works (requires app in your DEBUG variable, like DEBUG=www,app)
//If not replace with a console.log statement, or better the "advanced logger" refered to in the exercises
app.use((req, res, next) => {
  debug(new Date().toLocaleDateString(), req.method, req.originalUrl, req.ip)
  next()
})

//WINSTON/MORGAN-LOGGER (Use ONLY one of them)
// import logger, { stream } from "./middleware/logger";
// const morganFormat = process.env.NODE_ENV == "production" ? "combined" : "dev"
// app.use(require("morgan")(morganFormat, { stream }));
// app.set("logger", logger) 
//The line above sets the logger as a global key on the application object
//You can now use it from all your middlewares like this req.app.get("logger").log("info","Message")
//Level can be one of the following: error, warn, info, http, verbose, debug, silly
//Level = "error" will go to the error file in production

//app.use("/graphql", authMiddleware)

/*RETURNING AUTH MIDDLEWARE IF BODY FINAL IF BLOACK IS MET */
app.use("/graphql", (req, res, next) => {
  const body = req.body;
  if (body && body.query && body.query.includes("createFriend")) {
    console.log("Create")
    return next();
  }
  if (body && body.operationName && body.query.includes("IntrospectionQuery")) {
    return next();
  }
  if (body.query && (body.mutation || body.query)) {
    return authMiddleware(req, res, next)
  }
  next()
})

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

//Endpoint til find-friends native appen
import PositionFacade from './facades/positionFacade';
let facade: PositionFacade;

app.post("/friends", async (req, res) => {
  if (!facade) {
    const db = req.app.get("db")
    facade = new PositionFacade(db)
  }
  const { email, password, longitude, latitude, distance } = req.body;
  const friends = await facade.findNearbyFriends(email, password, longitude, latitude, distance)
  const friendsToReturn = friends.map((f: any) => {
    return { email: f.email, name: f.name, longitude: f.location.coordinates[0], latitude: f.location.coordinates[1] }
  })
  res.json(friendsToReturn)
})

//Grants access to static files
app.use(express.static(path.join(process.cwd(), "public")))

/*Friend part of API*/
app.use("/api/friends", friendsRoutes)



//Simple GET endpoint
app.get("/demo", (req, res) => {
  res.send("Server is up");
})

//Our own default 404-handler for api-requests
app.use("/api", (req: any, res: any, next) => {
  res.status(404).json({ errorCode: 404, msg: "not found" })
})

//Makes JSON error-response for ApiErrors, otherwise pass on to default error handleer
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof (ApiError)) {
     res.status(err.errorCode).json({ errorCode: err.errorCode, msg: err.message })
  } else {
    next(err)
  }
})

export default app;

