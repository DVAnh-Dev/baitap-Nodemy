const express =require('express');
// const todoModel = require('./mongo');
const router =express.Router();
const mongoose=require('mongoose');
const  checkAuth  = require('./checkAuth');
mongoose.connect('mongodb+srv://admin:admin@cluster0.lqtw9.mongodb.net/testDB?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });
  

const todoSchema= mongoose.Schema({
    userID:{
        type:String,
        ref:'user'
    },
    title:String,
    descrition:String,
    Date:String,
    status:String,
},{collection:'todolist'});
const todoModel = mongoose.model('todolist',todoSchema);
// module.exports= todoModel; 

router.delete(
    "/delete/:id",checkAuth.checkQuyen,
    (req, res) => {
      todoModel.deleteOne({ _id: req.params.id })
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.json(err);
        });
    }
  );
  router.post(
    "/create/",
    (req, res) => {
      todoModel.create()
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.json(err);
        });
    }
  );
  //
  router.post(
    "/taosp",
    (req, res) => {
      todoModel.create({
            title:req.body.title,
            descrition:req.body.description,
            Date:req.body.date,
            status:req.body.status
      })
        .then((data) => {
          res.json({
              mess:'tao sp thanh cong'
          });
        })
        .catch((err) => {
          res.json(err);
        });
    }
  );
  //
  router.put(
    "/suasp/:id",
    (req, res) => {
      // console.log(req.body);
      todoModel.updateOne(
        {
          _id: req.params.id,
        },{
          title:req.body.title,
          descrition:req.body.description,
            Date:req.body.date,
            status:req.body.status,
        }
      )
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.json(err);
        });
    }
  );
  // Đăng xuẩt
// todoModel.create({
//     userID:'60a5e1f3d4d0f02618927a3c'    ,
//     title:'hocsinh',
//     descrition:'gioi',
//     Date:'20',
//     status:'100'
// },{
//     userID:'60a5e1f3d4d0f02618927a3c',
//     title:'hocsinh 2',
//     descrition:'gioi',
//     Date:'20',
//     status:'10'
//     },{ userID:'60a5e1f3d4d0f02618927a3c',
//     title:'hocsinh 3',
//     descrition:'gioi',
//     Date:'20',
//     status:'100'})
// .then(data=>{
//     console.log(data);
// })
// .catch(err=>{
//     console.log(err);
// })
module.exports= {router,todoModel} 
