const express =require('express');
const userModel=require('./mongo');
const path = require('path')
// const hangModel=require('./hang');
// const hang=express.Router();
const router= express.Router();

// hang.use(bodyParser.urlencoded({extended:false}));
// hang.use(bodyParser.json());

router.get("/findAll",(req,res)=>{
    userModel.find()
    .then((data)=>{
        res.json(data);
    })
    .catch((err)=>{
        res.json(err);
    });
});
router.get('/:id',(req,res)=>{
    userModel.findOne({_id:req.params._id})
    .then((data)=>{
        res.json(data);
    })
    .catch((err)=>{
        res.json(err)
    });
});

router.get('/sigup',(req,res)=>{
  res.sendFile(path.join(__dirname,'./public/html/sigup.html'))
})

router.post(
    "/sigup",
    (req, res, next) => {
      userModel.findOne({ user: req.body.username }).then((data) => {
        if (data) {
          res.json({
              mess:"user đã tồn tại"
          });
        } else {
          next();
        }
      });
    },
    (req, res) => {
      userModel.create({
        user: req.body.username,
        pass: req.body.password,
        role: req.body.role,
      })
        .then((data) => {
            // console.log(data);
          res.json({

              mess:"Tạo tài khoản thành công"
              
          });
        })
        .catch((err) => {
          res.json(err);
        });
    }
  );


  // put  update data
  router.put(
    "/update/:id",
    (req, res, next) => {
      UserModel.findOne({
        username: req.body.username,
        password: req.body.password,
        _id: req.params.id,
      })
        .then((data) => {
          if (!data) {
            res.json("Hãy nhập Username và Password");
          } else {
            next();
          }
        })
        .catch((err) => {
          res.json(err);
        });
    },
    (req, res) => {
      UserModel.updateOne(
        {
          username: req.body.username,
          password: req.body.password,
          _id: req.params.id,
        },
        { password: req.body.newPass }
      )
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.json(err);
        });
    }
  );
  
  // delete  xoa
  
  router.delete(
    "/delete/:id",
    (req, res, next) => {
      UserModel.findOne({
        username: req.body.username,
        password: req.body.password,
      }).then((data) => {
        if (data) {
          if (data.role === "admin") {
            next();
          } else {
            res.json("không có quyền xóa");
          }
        } else {
          res.json("sai user, pass");
        }
      });
    },
    (req, res) => {
      UserModel.deleteOne({ _id: req.params.id })
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.json(err);
        });
    }
  );
  
  module.exports = router;
  