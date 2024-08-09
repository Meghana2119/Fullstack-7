import express, { json } from 'express'
import dotenv from 'dotenv'
dotenv.config()
//import connectToDb from './config/db';
import "./config/db.js"
import auth from './routes/auth.js'


const app = express();
const port = process.env.PORT || 3000;
//Middleware
 app.use(json());
 // register the user
 app.use('/api', auth)


app.get('/',(req,res)=>{
    res.send("Hello world hjfdhfdhfjk")
})


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
