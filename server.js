import express from "express"
import router from "./routes/router.js"
import cors from "cors"
const app = express()

const corsOptions  = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
}

app.use(cors(corsOptions ))
app.use(express.json())
app.route("/", router)


app.listen(3000, () =>{
    console.log("running")
})