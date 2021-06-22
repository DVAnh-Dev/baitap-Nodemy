const express=require('express');
const app= express();
const path=require('path');

var bodyParser =require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const userRouter =require('./userRouter');
const hangRouter=require('./hangRouter');
app.use('/public',express.static(path.join(__dirname,'./public')));
app.get('/sigup',(req,res)=>{
    res.sendFile(path.join(__dirname,'./public/html/sigup.html'))
});
// app.use('/hanghoa',hangRouter);
app.use('/index/',userRouter);
app.use('/hang/',hangRouter);

app.listen(3000);