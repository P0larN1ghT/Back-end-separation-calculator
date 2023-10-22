const express = require("express");
const router = express.Router();
const db = require("./models/mysql");


// 取出所有数据
router.get("/num", function(req, res, next) {
  let selectsql = "SELECT val FROM t_num;";

  db.query(selectsql, [], function(result, fields) {
    return res.status(200).json({
      err_code: 0,
      message: "OK",
      result: result
    });
  });
});
// 添加数据
router.post("/num", function(req, res, next) {
  let val = req.body.val; // 获取请求体中的 val 值

  let addSql = "INSERT INTO t_num(val) VALUES(?)";
  let addSqlParams = [val];

  db.query(addSql, addSqlParams, function(result, fields) {
    console.log("添加成功");
    return res.status(200).json({
      err_code: 0,
      message: "OK"
    });
  });
});
module.exports = router;
