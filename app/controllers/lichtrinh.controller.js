const ApiError = require('../api_error');
const sql = require('../util/mysql.util');

exports.dsLT = (req, res, next) => {
      let myquery = "select  * from lichtrinh natural join tour";
      try {
            sql.query(myquery, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}

exports.motLT = (req, res, next) => {
      let myquery = "select  * from lichtrinh natural join tour where idLT=?; ";
      try {
            sql.query(myquery, req.params.idLT, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}

exports.newLT = (req, res, next) => {
      let myquery = "INSERT INTO `dulich`.`lichtrinh` (`ngaykhoihanh`, `noikhoihanh`, `idT`) VALUES (?, ?, ?);      ";
      try {
            sql.query(myquery,
                  [
                        req.body.ngaykhoihanh,
                        req.body.noikhoihanh,
                        req.body.idT,
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
      let query = "UPDATE `dulich`.`lichtrinh` SET `ngaykhoihanh` = ?, `noikhoihanh` = ?, `idT` = ? WHERE (`idLT` = ?);";
      console.log(req.body)
      try {
            sql.query(query,
                  [
                        req.body.ngaykhoihanh,
                        req.body.noikhoihanh,
                        req.body.idT,
                        req.params.idLT,
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
      let myquery = "DELETE FROM `dulich`.`lichtrinh` WHERE (`idLT` = ?);";

      try {
            sql.query(myquery,
                  [req.params.idLT],
                  function (err, result, field) {
                        if (err) throw err.stack;
                        return res.json({ mes: `xóa thành công ${req.params.idLT}` });
                  })
      } catch (error) {
            return new ApiError(500, 'Không kết nối đc');
      }

}
exports.tongLT = (req, res, next) => {
      let myquery = "select *,count(*) as tong from lichtrinh natural join tour";
      try {
            sql.query(myquery, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}