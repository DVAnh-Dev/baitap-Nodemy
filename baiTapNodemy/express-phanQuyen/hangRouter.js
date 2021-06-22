const express =require('express');
const hangModel=require('./hang');
const hang=express.Router();
var bodyParser =require("body-parser");
hang.use(bodyParser.urlencoded({extended:false}));
hang.use(bodyParser.json());
const path = require('path')

hang.get("/findAll",(req,res)=>{
    userModel.find()
    .then((data)=>{
        res.json(data);
    })
    .catch((err)=>{
        res.json(err);
    });
});
hang.get('/:id',(req,res)=>{
    userModel.findOne({_id:req.params._id})
    .then((data)=>{
        res.json(data);
    })
    .catch((err)=>{
        res.json(err)
    });
});
hang.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'./public/html/hang.html'))
})
// post hang
hang.post(
    "/",
    (req, res, next) => {
      hangModel.findOne({ ten: req.body.ten }).then((data) => {
        if (data) {
          res.json({
              mess:"Hàng đã tồn tại"
          });
        } else {
          next();
        }
      });
    },
    (req, res) => {
      hangModel.create({
        ten: req.body.ten,
        gia: req.body.gia,
        soluong: req.body.soluong,
      })
        .then((data) => {
            // console.log(data);
          res.json({

              mess:"Tạo hàng thành công"
              
          });
        })
        .catch((err) => {
          res.json(err);
        });
    }
  );
  // put update hàng
  hang.put(
    "/update/:id",
    (req, res, next) => {
      hangModel.findOne({
        ten: req.body.ten,
        gia: req.body.gia,
        soluong: req.body.soluong,

        _id: req.params.id,
      })
        .then((data) => {
          if (!data) {
            res.json("Hãy nhập tên hàng và só lượng");
          } else {
            next();
          }
        })
        .catch((err) => {
          res.json(err);
        });
    },
    (req, res) => {
      Model.updateOne(
        {
            ten: req.body.ten,
            gia: req.body.gia,
            soluong: req.body.soluong,
          _id: req.params.id,
        },
        { ten: req.body.newten }
        ,{soluong:req.body.newsoluong},
        {gia:req.body.newgia}
      )
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.json(err);
        });
    }
  )

  module.exports = hang