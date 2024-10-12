import express from 'express';
import axios from "axios";
import cors from 'cors';
import bodyParser from 'body-parser';


const app = express();
const port = 3000;

app.use(express.json()); // Parse JSON bodies
app.use(cors());

app.get("/", (req,res)=>{
    // res.sendFile(path.join(frontendPath, "index.html"));

})


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})