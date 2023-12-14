const ApiError = require('../api_error');
const sql = require('../util/mysql.util');

exports.dsvetour = (req, res, next) => {
      let myquery = "select  * from vetour ";
      try {
            sql.query(myquery, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}

exports.motvetour = (req, res, next) => {
      let myquery = "select  * from vetour where idV=?; ";
      try {
            sql.query(myquery, req.params.idV, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}


exports.newV = (req, res, next) => {
      let myquery = "INSERT INTO `dulich`.`vetour` (`nguoilon`, `tre10`, `idT`, `soluong`) VALUES (?, ?, ?, ?);";
      try {
            sql.query(myquery,
                  [
                        req.body.nguoilon,
                        req.body.tre10,
                        req.body.idT,
                        req.body.soluong,
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
      let query = "UPDATE `dulich`.`vetour` SET `nguoilon` = ?, `tre10` = ?, `idT` = ?, `soluong` = ? WHERE (`idV` = ?);      ";
      console.log(req.body)
      try {
            sql.query(query,
                  [
                        req.body.nguoilon,
                        req.body.tre10,
                        req.body.idT,
                        req.body.soluong,
                        req.params.idV
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
      let myquery = "DELETE FROM `dulich`.`vetour` WHERE (`idV` = ?);";

      try {
            sql.query(myquery,
                  [req.params.idV],
                  function (err, result, field) {
                        if (err) throw err.stack;
                        return res.json({ mes: `xóa thành công ${req.params.idHK}` });
                  })
      } catch (error) {
            return new ApiError(500, 'Không kết nối đc');
      }

}