const express = require('express'); // gọi gói express đã cài 
// console.log(express);
// const path=require('path');
const app = express();
var port = process.env.PORT || 5000;
const todoModel =require('./todoRouter');
// const UserRouter = require("./userRouter");
const path = require("path");
const UserRouter = require("./userRouter");
const cookieParser=require('cookie-parser');
app.use(cookieParser());
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const todoRouter =require('./todoRouter');
const userModel = require('./mongo');
//
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/XAMPP/htdocs/Nodemy/ExpessJS/js/uploads')
  },
  filename: function (req, file, cb) {
    let last = file.originalname.lastIndexOf('.')
    let ext = file.originalname.slice(last, file.originalname.length)
    // console.log(ext);
    cb(null, file.fieldname + '-' + Date.now()+ext)
  }
})
 
var upload = multer({ storage: storage })
// app.post('/profile', upload.single('file'), function (req, res, next) {
//   // req.file is the `avatar` file
//   // req.body will hold the text fields, if there were any
// })
// var upload = multer({ dest: 'uploads/' })

app.get('/multer',(req,res)=>{res.sendFile(path.join(__dirname,'./html/multer.html'))})

//
app.get('/todolist',(req,res)=>{res.sendFile(path.join(__dirname,'./html/todolist.html'))})
app.get('/todolist/getAll',(req,res)=>{var id= req.params.id; // :id
  todoModel.todoModel.find() // {userID:id}
.then(data=>{
  res.json(data);
})
.catch(err=>{
  res.json(err);
})
})
app.use('/public', express.static(path.join(__dirname,'./js')))   //
app.get('/sigup',function (req,res) {
    res.sendFile(path.join(__dirname,'./html/login.html'))
});
app.get('/api/user/signin',function(req,res){
    res.sendFile(path.join(__dirname,'./html/signin.html'))
  });
  //
  app.post('/profile',upload.single('file'),function(req,res,next){
    // console.log(req.body);
    // console.log(req.file);

    let publicIndex= req.file.destination.indexOf('js');
    let public=req.file.destination.slice(publicIndex + 2,req.file.destination.length);
    let  imgUrl= '/public'+public +'/'+req.file.filename
   
    userModel.create({
      user: req.body.username,
      password: req.body.password,
      avatar:imgUrl
      // role: req.body.role,
    })
      .then((data) => {
        // console.log(data);
        res.json( data);
      })
      .catch((err) => {
        // console.log(err);
        res.json(err);
      });
  })
  //
  app.get('/api/user/todolist',function(req,res){
    res.sendFile(path.join(__dirname,'./html/todolist.html'))
  });
  //
  app.get('/api/user/private',function(req,res){
    res.sendFile(path.join(__dirname,'./html/private.html'))
  });
  //
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
app.use("/api/user/", UserRouter);
app.use("/api/user/todo", todoRouter.router);
// console.log(todoRouter);
app.listen(port); //  tạo cổng

