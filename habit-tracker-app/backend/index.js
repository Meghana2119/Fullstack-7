const express = require('express');
require('dotenv').config();
const connectToDb = require('./config/db')
const auth = require('./routes/auth')


const app = express();
const port = process.env.PORT || 3000;
//Middleware
 app.use(express.json());
 // register the user
 app.use('/api/auth', auth)


app.get('/',(req,res)=>{
    res.send("Hello world hjfdhfdhfjk")
})


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
