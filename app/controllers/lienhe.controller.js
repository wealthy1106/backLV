const ApiError = require('../api_error');
const sql = require('../util/mysql.util');

exports.lienhe = (req, res, next) => {
      let myquery = "select  * from lienhe ";
      try {
            sql.query(myquery, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}

exports.motlienhe = (req, res, next) => {
      let myquery = "select  * from lienhe where idLH=?; ";
      try {
            sql.query(myquery, req.params.idLH, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}


exports.newlienhe = (req, res, next) => {
      let myquery = "INSERT INTO `dulich`.`lienhe` (`diachiLH`, `emailLH`, `sdtLH`, `map`) VALUES (?,?,?,?);"
      try {
            sql.query(myquery,
                  [
                        req.body.diachiLH,
                        req.body.emailLH,
                        req.body.sdtLH,
                        req.body.map,
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
      let query = "UPDATE `dulich`.`lienhe` SET `diachiLH` = ?, `emailLH` = ?, `sdtLH` = ?, `map` = ? WHERE (`idLH` = ?);"
      console.log(req.body)
      try {
            sql.query(query,
                  [
                        req.body.diachiLH,
                        req.body.emailLH,
                        req.body.sdtLH,
                        req.body.map,
                        req.params.idLH,
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
      let myquery = "DELETE FROM `dulich`.`lienhe` WHERE (`idLH` = ?);";

      try {
            sql.query(myquery,
                  [req.params.idLH],
                  function (err, result, field) {
                        if (err) throw err.stack;
                        return res.json({ mes: `xóa thành công ${req.params.idLH}` });
                  })
      } catch (error) {
            return new ApiError(500, 'Không kết nối đc');
      }

}
exports.tinhthanh = (req, res, next) => {
      let myquery = "select  * from tinhthanh ";
      try {
            sql.query(myquery, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}
exports.tongtinh = (req, res, next) => {
      let myquery = "select  *,count(*) as tong from tinhthanh ";
      try {
            sql.query(myquery, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}

exports.newtinh = (req, res, next) => {
      let myquery = "INSERT INTO `dulich`.`tinhthanh` (`tenTinh`) VALUES (?);      "
      try {
            sql.query(myquery,
                  [
                        req.body.tenTinh,

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

exports.updateTinh = (req, res, next) => {
      let query = "UPDATE `dulich`.`tinhthanh` SET `tenTinh` = ? WHERE (`idTinh` = ?);      "
      console.log(req.body)
      try {
            sql.query(query,
                  [
                        req.body.tenTinh,
                        req.params.idTinh,
                  ], function (err, result, filters) {
                        if (err) throw err.stack;
                        return res.send('Cập nhật trạng thái thành công');
                  })
            console.log(query)
      } catch (error) {
            return new ApiError(500, 'Kết nối thất bại');
      }
}
exports.mottinh = (req, res, next) => {
      let myquery = "select  * from tinhthanh where idTinh=?; ";
      try {
            sql.query(myquery, req.params.idTinh, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}
exports.deleteTinh = async (req, res, next) => {
      let myquery = "DELETE FROM `dulich`.`tinhthanh` WHERE (`idTinh` = ?);";

      try {
            sql.query(myquery,
                  [req.params.idTinh],
                  function (err, result, field) {
                        if (err) throw err.stack;
                        return res.json({ mes: `xóa thành công ${req.params.idTinh}` });
                  })
      } catch (error) {
            return new ApiError(500, 'Không kết nối đc');
      }

}