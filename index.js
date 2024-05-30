//server
const express= require('express');
const cors=require('cors');
const app=express();
const port=3100;

//middleware
app.use(cors());
app.use(express.json());


app.get('/',(req,res)=>{
    res.send('server running')
})

app.listen(port,()=>{
    console.log(`listening at port ${port}`);
})