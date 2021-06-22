var jwt= require('jsonwebtoken');
var pass = 'hello';
var token = jwt.sign({ matkhau: pass }, 'makhoa');
// console.log(token);
var dich =  jwt.verify(token,'makhoa');
// console.log(dich);
