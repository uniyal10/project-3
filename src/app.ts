import express, { Request, Response, NextFunction } from "express"
import { json } from "body-parser"
import todoRoutes from "./routes"
import cors from "cors"

const app = express()
app.use(cors())
app.use(json())
app.use("/users", todoRoutes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message })
})




export default app

app.listen(8080)

//routes

