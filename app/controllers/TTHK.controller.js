const ApiError = require('../api_error');
const sql = require('../util/mysql.util');

exports.dstthk = (req, res, next) => {
      let myquery = "select  * from tthk ";
      try {
            sql.query(myquery, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}

exports.motHK = (req, res, next) => {
      let myquery = "select  * from tthk where idHK=?; ";
      try {
            sql.query(myquery, req.params.idHK, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}

exports.motds = (req, res, next) => {
      let myquery = "select * from TTHK where idDT=?;";
      try {
            sql.query(myquery, req.params.idDT, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}

exports.newtthk = (req, res, next) => {
      let myquery = "INSERT INTO `dulich`.`tthk` (`hotenHK`, `sdt`, `namsinh`, `idT`, `ngaykhoihanh`) VALUES (?, ?, ?, ?, ?);";
      try {
            sql.query(myquery,
                  [
                        req.body.hotenHK,
                        req.body.sdt,
                        req.body.namsinh,
                        req.body.idT,
                        req.body.ngaykhoihanh
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
      let query = "UPDATE `dulich`.`TTHK` SET `hotenHK` = ?, `sdt` = ?, `namsinh` = ? WHERE (`idHK` = ?);";
      console.log(req.body)
      try {
            sql.query(query,
                  [
                        req.body.hotenHK,
                        req.body.sdt,
                        req.body.namsinh,
                        req.params.idHK
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
      let myquery = "DELETE FROM `dulich`.`tthk` WHERE (`idHK` = ?);";

      try {
            sql.query(myquery,
                  [req.params.idHK],
                  function (err, result, field) {
                        if (err) throw err.stack;
                        return res.json({ mes: `xóa thành công ${req.params.idHK}` });
                  })
      } catch (error) {
            return new ApiError(500, 'Không kết nối đc');
      }

}