import dotenv from "dotenv";  
import express from "express";  
import cors from "cors";
import sequelize from "./config/db.js";  
import bodyParser from "body-parser";
import AdminRouter from './routes/adminRoutes.js';
import UserRouter from './routes/userRoutes.js';
import Vendor from './routes/vendorRoutes.js';

dotenv.config(); 
const app = express();

const PORT = process.env.PORT; 

// Enable CORS for all routes
app.use(cors()); 

// Serve static files from the uploads folder
app.use("/uploads", express.static("uploads"));

sequelize.sync()
  .then(() => console.log("All models synced successfully"))
  .catch(err => console.log("Sync error: ", err));

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

app.use("/admin", AdminRouter);
app.use("/user", UserRouter); 
app.use("/vendor", Vendor);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
