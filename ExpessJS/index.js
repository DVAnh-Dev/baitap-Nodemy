const express = require('express'); // gọi gói express đã cài 
console.log(express);
const path=require('path')
const app = express();
app.get('/',function (req,res) {
res.json('hello express');
});
app.post('/home',function (req,res) {
    res.json('hello 500');
    });
app.put('/home',function (req,res) {
        res.json('hello put');
        });
// app.post
// app.delete
app.listen(5000); //  tạo cổng 