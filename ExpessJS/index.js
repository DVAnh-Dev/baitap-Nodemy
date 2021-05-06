const express = require('express'); // gọi gói express đã cài 
console.log(express);
const app = express();
app.get('/',function (req,res) {
res.json('hello express');
});
app.listen(5000); //  tạo cổng 