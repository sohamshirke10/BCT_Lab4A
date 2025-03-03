import express from "express";
import cors from "cors";
import routes from "./routes.js"

const app = express();

app.use(cors())
app.use(express.json())
app.use(routes);

const PORT = 4000;

app.listen(PORT,"0.0.0.0",()=>{
    console.log(`Server listening on port ${PORT}....`);
})