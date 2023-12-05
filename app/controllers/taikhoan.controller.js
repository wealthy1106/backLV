const ApiError = require('../api_error');
const sql = require('../util/mysql.util');
const jwt = require('jsonwebtoken');
const secretKey = '1112';
//Lay ds tai khoan
exports.layDSTK = (req, res, next) => {
      let myquery = "select  * from taikhoan";
      try {
            sql.query(myquery, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}
//lay 1 tai khoan
exports.layTK = (req, res, next) => {
      let myquery = "select  * from taikhoan where idTK=?; ";
      try {
            sql.query(myquery, req.params.idTK, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}

exports.login = (req, res, next) => {
      let myquery = "select * from taikhoan where email=? && matkhau=?";
      try {
            sql.query(myquery, [req.body.email, req.body.matkhau], (err, result, filters) => {
                  if (err) throw err.stack;
                  if (result.length > 0) {
                        const user = { id: result[0].idTK, email: result[0].email, vaitro: result[0].vaitro };
                        const token = jwt.sign(user, secretKey);
                        console.log('tt', user)
                        // console.log(token)
                        return res.status(200).json({
                              message: 'Login successful',
                              token: token,
                              user: user,
                        });
                  } else {
                        return res.status(401).json({ error: 'Unauthorized' });
                  }
                  return res.send('đúng');

            })
      } catch (error) {
            return new ApiError(500, 'Lỗi máy chủ');
      }
}
// exports.login = (req, res, next) => {
//       let myquery = "select * from taikhoan where email=? && matkhau=?";
//       sql.query(myquery, [req.body.email, req.body.matkhau], (err, result, filters) => {
//             if (err) throw err.stack;
//             return res.send(result);
//       })
//       if (results.length === 1) {
//             const taikhoan = results[0];
//             const token = jwt.sign({ id: taikhoan.id, username: taikhoan.hoten }, 'your-secret-key');

//             return res.json({ token });
//       } else {
//             return res.status(401).json({ error: 'Tên đăng nhập hoặc mật khẩu không đúng' });
//       }
// }

exports.newuser = (req, res, next) => {
      let myquery = "INSERT INTO `dulich`.`taikhoan` (`hoten`, `diachi`, `email`,`sdt`,`matkhau`, `vaitro`) VALUES (?, ?, ?,?, ?, 'user');";
      try {
            sql.query(myquery,
                  [
                        req.body.hoten,
                        req.body.diachi,
                        req.body.email,
                        req.body.sdt,
                        req.body.matkhau,
                  ],
                  function (err, result, filters) {
                        if (err) throw err.stack;
                        return res.send(result);

                  }
            )
      } catch (error) {
            return new ApiError(500, 'Thất bại');
      }
}

exports.chinhsua = (req, res, next) => {
      let query = " UPDATE `dulich`.`taikhoan` SET `hoten` = ?, `diachi` = ?, `email` = ?, `matkhau` = ? WHERE (`idTK` = ?);";
      console.log(req.body)
      try {
            sql.query(query,
                  [
                        req.body.hoten,
                        req.body.diachi,
                        req.body.email,
                        req.body.matkhau,
                        req.params.idTK,
                  ], function (err, result, filters) {
                        if (err) throw err.stack;
                        return res.send('Cập nhật trạng thái thành công');
                  })
            console.log(query)
      } catch (error) {
            return new ApiError(500, 'Kết nối thất bại');
      }
}
exports.delete = async (req, res, next) => {
      let myquery = "DELETE FROM `dulich`.`taikhoan` WHERE (`idTK` = ?);";

      try {
            sql.query(myquery,
                  [req.params.idTK],
                  function (err, result, field) {
                        if (err) throw err.stack;
                        return res.json({ mes: `xóa thành công phong ${req.params.idTK}` });
                  })
      } catch (error) {
            return new ApiError(500, 'Không kết nối đc');
      }

}