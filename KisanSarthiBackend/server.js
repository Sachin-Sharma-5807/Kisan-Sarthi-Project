import dotenv from "dotenv";  
import express from "express";  
import cors from "cors";
import bodyParser from "body-parser";
import mainRoute from './routes/index.js';


dotenv.config(); 
const app = express();

const PORT = process.env.PORT; 

// Enable CORS for all routes
app.use(cors()); 

// Serve static files from the uploads folder
app.use("/uploads", express.static("uploads"));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  console.log("URL : ", req.url);
  console.log("Method : ", req.method);
  console.log("Body : ", req.body);
  next();
});

app.use((req,res,next) => {
  console.log("URL : ",req.url);
  console.log("Method : ",req.method);
  console.log("Body : ",req.body);
  
  next();
})


app.use("/api", mainRoute); 


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
