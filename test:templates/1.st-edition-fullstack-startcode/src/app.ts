import express from "express";
import dotenv from "dotenv";
dotenv.config()
import path from "path"
import { isNamedExportBindings } from "typescript";
const app = express()
const debug = require('debug')('app')
// Something has to go in here

app.use((req,res,next) => {
  debug(new Date().toLocaleDateString(), req.method , req.originalUrl, req.ip) 
  next()
})

app.use(express.static(path.join(process.cwd(), "public")))

app.get("/demo", (req, res) => {
  let a = 124;
  console.log(a)
  res.send("Server is REALLY up");
})



export default app;