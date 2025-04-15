import dotenv from 'dotenv';
import {Sequelize } from 'sequelize';
dotenv.config();//load .env file

// Sequelize ka instance bana rahe hain
const sequelize = new Sequelize(
    process.env.DB_NAME,       // .env se database name
    process.env.DB_USER,       // .env se database user
    process.env.DB_PASSWORD,   // .env se database password
    {
      host: process.env.DB_HOST,  // .env se host (usually localhost)
      dialect: "mysql",  // Dialect (e.g., 'mysql')
      logging: false,   // SQL queries ko console pe print na karein
    }
  );

sequelize.authenticate()
.then(result=>{
    console.log("Database Connected...");
})
.catch(err=>{
    console.log("Database not connected....");
    console.log(err);
});
export default sequelize;