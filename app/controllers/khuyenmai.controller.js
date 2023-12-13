const ApiError = require('../api_error');
const sql = require('../util/mysql.util');

exports.KM = (req, res, next) => {
      let myquery = "select  * from khuyenmai natural join tour ";
      try {
            sql.query(myquery, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}

exports.all = (req, res, next) => {
      let myquery = "select *,giaT*phantram/100 as giagiam,giaT-(giaT*phantram/100) as tich from khuyenmai natural join tour natural join lichtrinh;";
      try {
            sql.query(myquery, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}

exports.giadKM = (req, res, next) => {
      let myquery = "select *,giaT-(giaT*phantram/100) as veNL, tre10-(tre10*phantram/100) as veT from tour natural join khuyenmai natural join vetour where idT=? and idKM=?";
      try {
            sql.query(myquery, [req.params.idT, req.params.idKM], (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}

exports.all3 = (req, res, next) => {
      let myquery = "select *,giaT*phantram/100 as giagiam,giaT-(giaT*phantram/100) as tich,date_format(ngaykhoihanh,'%d/%m/%y') as dateKH from khuyenmai natural join tour natural join lichtrinh limit 3";
      try {
            sql.query(myquery, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}

exports.all33 = (req, res, next) => {
      let myquery = "select *,giaT*phantram/100 as giagiam,giaT-(giaT*phantram/100) as tich,date_format(ngaykhoihanh,'%d/%m/%y') as dateKH from khuyenmai natural join tour natural join lichtrinh limit 3,3";
      try {
            sql.query(myquery, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}

exports.all63 = (req, res, next) => {
      let myquery = "select *,giaT*phantram/100 as giagiam,giaT-(giaT*phantram/100) as tich,date_format(ngaykhoihanh,'%d/%m/%y') as dateKH from khuyenmai natural join tour natural join lichtrinh limit 6,3";
      try {
            sql.query(myquery, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}

exports.motKM = (req, res, next) => {
      let myquery = "select  * from khuyenmai natural join tour where idKM=?; ";
      try {
            sql.query(myquery, req.params.idKM, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}


exports.newKM = (req, res, next) => {
      let myquery = "INSERT INTO `dulich`.`khuyenmai` (`tenKM`, `phantram`, `idT`) VALUES (?,?,?);"
      try {
            sql.query(myquery,
                  [
                        req.body.tenKM,
                        req.body.phantram,
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
      let query = "UPDATE `dulich`.`khuyenmai` SET `tenKM` = ?, `phantram` = ?, `idT` = ? WHERE (`idKM` = ?);"
      console.log(req.body)
      try {
            sql.query(query,
                  [
                        req.body.tenKM,
                        req.body.phantram,
                        req.body.idT,
                        req.params.idKM,
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
      let myquery = "DELETE FROM `dulich`.`khuyenmai` WHERE (`idKM` = ?);";

      try {
            sql.query(myquery,
                  [req.params.idKM],
                  function (err, result, field) {
                        if (err) throw err.stack;
                        return res.json({ mes: `xóa thành công ${req.params.idLH}` });
                  })
      } catch (error) {
            return new ApiError(500, 'Không kết nối đc');
      }

}
exports.tongKM = (req, res, next) => {
      let myquery = "select count(*) as tong from khuyenmai;";
      try {
            sql.query(myquery, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}