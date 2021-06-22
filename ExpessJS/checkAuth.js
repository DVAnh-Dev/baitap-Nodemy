const blacklist=require('./js/blacklist')
const jwt =require('jsonwebtoken')
const userModel = require("./mongo");

function checkToken(req,res,next){
        let token= req.cookies.token;
        blacklist.findOne({token:token})
        .then(data=>{
          if(data){
            res.json({mess:'Token ko hợp lệ',status:400,err:false})
          }else{
            next()
          }
        })
        .catch(err=>{
          res.json({mess:'Lỗi server',status:500,err:err})
        })
}

function checkAuth(req,res){
    
        let token= req.cookies.token;
        let id = jwt.verify(token,'vanh').id;
        userModel.findOne({_id:id})
        .then((data)=>{
          if(data){
            res.json({
              mess:"Đã đăng nhập",
              status:200
            })
          }else{
            res.json({
              mess:"user không tồn tại",
              status:400
            })
          }
        })
        .catch((err)=>{
          res.json({mess:'loi server', status:500});
        })
}
// check quyền 
async function checkQuyen(req,res,next){
  try {
    let token= req.cookies.token;
  let id = jwt.verify(token,'vanh').id;
  let checkID= await userModel.findOne({_id:id})
  // console.log(47, checkID);
  if (checkID.role=='admin'){
    next()
  }else{
    res.json({mess:"ban khong co quyen"})
  }
  } catch (error) {
    res.json({mess:"Loi server"})
  }
}
module.exports= {checkToken,checkAuth,checkQuyen};
