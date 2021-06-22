const express = require("express");
const UserModel = require("./mongo");
const router = express.Router();
const blacklist =require('./js/blacklist')
const jwt= require('jsonwebtoken');
const checkAuth=require('./checkAuth') 
var cookieParser = require('cookie-parser');
const userModel = require("./mongo");
var app = express()
app.use(cookieParser())
router.get("/findAll", (req, res) => {
  UserModel.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

//
router.post('/private',checkAuth.checkToken,checkAuth.checkAuth)
//
router.post('/private/:id',(req,res)=>{
  // let token = req.cookies.token;
  let id = jwt.verify(req.params.id,'vanh').id;
  userModel.findOne({_id:id})
  .then((data)=>{
    // console.log(data);
    res.json({data:data.user,mess:"OK",status:200,err:false})
  })
  .catch(err=>{console.log(err);})
})
//
router.post('/signin',(req, res)=>{
  let user =req.body.username;
  let pass =req.body.password;
  UserModel.findOne({user:user,password:pass})
  // let token =jwt.sign({id:data._id,},'vanh')
  .then((data)=>{
    if(data){
      let token= jwt.sign({id:data._id},'vanh');
      res.status(200).json({
        token:token,
        mess:"đăng nhập thành công ",
        status:200
      });
    }else {
      res.json({mess:"sai user password"});
    }
  })
  .catch((err)=>
  {res.json(err)})
})

//

//
router.get("/:id", (req, res) => {
  UserModel.findOne({ _id: req.params.id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

// post  create , thêm data
router.post(
  "/signup",
  (req, res, next) => {
    UserModel.findOne({ user: req.body.username }).then((data) => {
      if (data) {
        res.json({
            mess:"user da ton tai"
        });
      } else {
        next();
      }
    });
  },
  (req, res) => {
    UserModel.create({
      user: req.body.username,
      password: req.body.password,
      role: req.body.role,
    })
      .then((data) => {
        res.json({
            mess:'tao tk thanh cong'
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
          res.json("nhap user, password");
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
          res.json("khong co quyen ban");
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
// Đăng xuẩt
router.post('/signout',(req,res)=>{
  let token= req.cookies.token;
  blacklist.create({token:token})
  .then(data=>{res.json(data);})
  .catch(err=>{res.json(err);})
})

//

module.exports = router;
