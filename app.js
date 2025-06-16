const express = require('express');
const app = express();
const port = 8000;
const router = require('./routes');
const cors = require('cors');
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors()); // Разрешает все домены
app.use(router);
app.listen(port, (error)=>{
    error? console.log(error) : console.log(`listening port ${port}`);
});



app.use((req,res)=>{
    res.status(404).json({message:'error'});
})