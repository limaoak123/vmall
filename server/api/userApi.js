var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

// 连接数据库
var con = mysql.createConnection(models.mysql);
con.connect();
var jsonWrite = function(res,ret) {
  if(typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    });
  } else {
    res.json(ret);
  }
}

// 增加用户接口
router.post('/addUser',(req,res) => {
  var sql = $sql.user.add;
  var params = req.body;
  console.log(params);
  con.query(sql, [params.newUsername,params.newPassword],function(err,result){
    if (err) {
      console.log(err);
    } else {
      jsonWrite(res,result);
    }
  })
})

//用户唯一验证
router.get('/onlyUser',(req,res) => {
  var sql = $sql.user.onlyUser;
  // var username = params.newUsername;
  var username = req.query.newUsername;
  con.query(sql,[username],function(err,result){
    if (err) {
      console.log(err);
    } else {
      jsonWrite(res,result);
    }
  })
})

// 登录验证
router.post('/login',(req,res) => {
  var sql = $sql.user.onlyUser;
  var params = req.body;
  con.query(sql,[params.username],function(err,result){
    if (err) {
      console.log(err);
    } else {
      if (result[0]) {
        if (result[0].password == params.password) {
          console.log('登录成功');
          res.send({ code: 100, msg: '登录成功',data:result[0]});
        } else {
          console.log('密码有误，请重新输入');
          res.send({ code: -102, msg: '密码有误，请重新输入' })
        }
      } else {
        console.log('用户名不存在，请重新登录');
        res.send({ code: -101, msg: '用户名不存在，请重新登录' });
      }
    }
  })
})
module.exports = router;
