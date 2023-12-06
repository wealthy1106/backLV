const ApiError = require('../api_error');
const sql = require('../util/mysql.util');

exports.ds = (req, res, next) => {
      let myquery = "select  * from thanhtoan ";
      try {
            sql.query(myquery, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}

exports.dsdd = (req, res, next) => {
      let myquery = "select * from tour natural join vetour where idT=?;";
      try {
            sql.query(myquery, req.params.idT, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}

exports.ngaythang = (req, res, next) => {
      let myquery = "select ngaykhoihanh,date_format(ngaykhoihanh,'%d/%m') as ngaythang,date_add(ngaykhoihanh,INTERVAL songay DAY )as ngayend from lichtrinh natural join tour where idT=?;";
      try {
            sql.query(myquery, req.params.idT, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}


exports.motid = (req, res, next) => {
      let myquery = "select * from thanhtoan where idTT=?;";
      try {
            sql.query(myquery, req.params.idTT, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}


exports.new = (req, res, next) => {
      let myquery = "INSERT INTO `dulich`.`thanhtoan` (`phuongthuc`, `tongcong`, `trangthai`, `idT`, `idTK`, `ngaykhoihanh`) VALUES (?, ?, 'Chưa xử lí', ?, ?, ?)";

      try {
            sql.query(
                  myquery,
                  [
                        req.body.phuongthuc,
                        req.body.tongcong,
                        req.body.idT,  // Chắc chắn rằng giá trị này hợp lệ và tồn tại trong bảng tour
                        req.body.idTK,
                        req.body.ngaykhoihanh,
                  ],
                  function (err, result, fields) {
                        if (err) {
                              console.error(err);
                              return res.status(500).send(err.message); // Trả về lỗi nếu có lỗi
                        }
                        return res.status(200).send(result);
                  }
            );
      } catch (error) {
            console.error(error);
            return res.status(500).send('Thất bại');
      }
}


exports.chinhsua = (req, res, next) => {
      let query = "UPDATE `dulich`.`thanhtoan` SET  `phuongthuc` = ?, `ngaythanhtoan` = ?, `tongcong` = ?, `trangthai` = ? WHERE (`idTT` = '1');";
      console.log(req.body)
      try {
            sql.query(query,
                  [
                        req.body.phuongthuc,
                        req.body.ngaythanhtoan,
                        req.body.tongcong,
                        req.body.trangthai,
                        req.params.idTT,
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
      let myquery = "DELETE FROM `dulich`.`thanhtoan` WHERE (`idTT` = ?);";

      try {
            sql.query(myquery,
                  [req.params.idTT],
                  function (err, result, field) {
                        if (err) throw err.stack;
                        return res.json({ mes: `xóa thành công${req.params.idTT}` });
                  })
      } catch (error) {
            return new ApiError(500, 'Không kết nối đc');
      }

}