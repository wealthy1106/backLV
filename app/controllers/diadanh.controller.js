const ApiError = require('../api_error');
const sql = require('../util/mysql.util');

exports.dsdiadanh = (req, res, next) => {
      let myquery = "select  * from diadanh ";
      try {
            sql.query(myquery, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}

exports.dsdiadanh1 = (req, res, next) => {
      let myquery = "select  * from diadanh ";
      try {
            sql.query(myquery, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}
//1 dia danh
exports.motdd = (req, res, next) => {
      let myquery = "select * from diadanh where idDD=?;";
      try {
            sql.query(myquery, req.params.idDD, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}


exports.newdd = (req, res, next) => {
      let myquery = "INSERT INTO `dulich`.`diadanh` (`idTinh`, `tenDD`, `motaDD`, `mienDD`, `hinh1`) VALUES (?, ?, ?, ?, ?);";
      try {
            sql.query(myquery,
                  [
                        req.body.idTinh,
                        req.body.tenDD,
                        req.body.motaDD,
                        req.body.mienDD,
                        req.body.hinh1,
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
      let query = "UPDATE `dulich`.`diadanh` SET `idTinh` = ?, `tenDD` = ?, `motaDD` = ?, `mienDD` = ?, `hinh1` = ? WHERE (`idDD` = ?);";
      console.log(req.body)
      try {
            sql.query(query,
                  [
                        req.body.idTinh,
                        req.body.tenDD,
                        req.body.motaDD,
                        req.body.mienDD,
                        req.body.hinh1,
                        req.params.idDD,
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
      let myquery = "DELETE FROM `dulich`.`diadanh` WHERE (`idDD` = ?);";

      try {
            sql.query(myquery,
                  [req.params.idDD],
                  function (err, result, field) {
                        if (err) throw err.stack;
                        return res.json({ mes: `xóa thành công phong ${req.params.idDD}` });
                  })
      } catch (error) {
            return new ApiError(500, 'Không kết nối đc');
      }

}
exports.tenmien = (req, res, next) => {
      let myquery = "SELECT DISTINCT mienDD FROM diadanh;";
      try {
            sql.query(myquery, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}

exports.tinhMN = (req, res, next) => {
      let myquery = "select * from diemdenNB natural join diadanh where mienDD='Miền Nam'";
      try {
            sql.query(myquery, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}
exports.tinhMT = (req, res, next) => {
      let myquery = "select * from diemdenNB natural join diadanh where mienDD='Miền Trung'";
      try {
            sql.query(myquery, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}
exports.tinhMB = (req, res, next) => {
      let myquery = "select * from diemdenNB natural join diadanh where mienDD='Miền Bắc'limit 1";
      try {
            sql.query(myquery, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}

exports.tourtheotinh = (req, res, next) => {
      let myquery = "select * from tinhthanh natural join diadanh where idTinh=?;";
      try {
            sql.query(myquery, req.body.idTinh, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}

exports.alltinh = (req, res, next) => {
      let myquery = "SELECT * FROM tinhthanh ";
      try {
            sql.query(myquery, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}
exports.tinh = (req, res, next) => {
      let myquery = "select * from diemdenNB natural join diadanh  natural join tour_diadanh natural join lichtrinh natural join tinhthanh limit 6 ";
      try {
            sql.query(myquery, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}

exports.tinhtour = (req, res, next) => {
      let myquery = "select *,date_format(ngaykhoihanh,'%d/%m/%y') as dateKH  from tour_diadanh natural join lichtrinh natural join tour natural join diadanh where idTinh=? group by idT;";
      try {
            sql.query(myquery, req.params.tentinh, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}
exports.timkiemtinh = (req, res, next) => {
      let myquery = "select *,date_format(ngaykhoihanh,'%d/%m/%y') as dateKH from tour_diadanh natural join lichtrinh natural join tour natural join diadanh natural join tinhthanh where tenTinh like ? group by idT;";
      try {
            sql.query(myquery, [`%${req.params.tentinh}%`], (err, result, filters) => {
                  if (err) throw err.stack;
                  // console.log('test', myquery)
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}
exports.timkiemtenDD = (req, res, next) => {
      let myquery = "select *,date_format(ngaykhoihanh,'%d/%m/%y') as dateKH from tour_diadanh natural join lichtrinh natural join tour natural join diadanh where tenDD like ? group by idT;";
      try {
            sql.query(myquery, [`%${req.params.tenDD}%`], (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}

exports.lichtrinh = (req, res, next) => {
      let myquery = "select * from tour_diadanh natural join lichtrinh where idT=? and idLT=? group by tieude ORDER BY tieude DESC;";
      try {
            sql.query(myquery, [req.params.idT, req.params.idLT], (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}

exports.tumlum = (req, res, next) => {
      let myquery = "select * from tour_diadanh natural join diadanh where idT=?";
      try {
            sql.query(myquery, [req.params.idT], (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}

exports.diemden = (req, res, next) => {
      let myquery = "select * from diadanh natural join tinhthanh group by idTinh";
      try {
            sql.query(myquery, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}

exports.diemdentheotinh = (req, res, next) => {
      let myquery = "select * from diadanh natural join tinhthanh where idTinh=?;";
      try {
            sql.query(myquery, [req.params.idTinh], (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}

exports.tinhthanh = (req, res, next) => {
      let myquery = "select * from tinhthanh where idTinh=?;";
      try {
            sql.query(myquery, [req.params.idTinh], (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}

exports.tourTinh = (req, res, next) => {
      let myquery = "select * from tour natural join diadanh natural join tinhthanh natural join tour_diadanh natural join lichtrinh where idTinh=? group by idT;";
      try {
            sql.query(myquery, [req.params.idTinh], (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}
exports.timkiemtentinh = (req, res, next) => {
      let myquery = "select * from diadanh natural join tinhthanh where idTinh=? group by idTinh;";
      try {
            sql.query(myquery, [req.params.idTinh], (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}

exports.tourtimkiem = (req, res, next) => {
      let myquery = "select * from tinhthanh natural join diadanh natural join tour_diadanh natural join tour natural join lichtrinh where tenDD like ? group by idT;";
      try {
            sql.query(myquery, [`%${req.params.tenDD}%`], (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}

exports.dsDD = (req, res, next) => {
      let myquery = "select * from tinhthanh natural join diadanh ;";
      try {
            sql.query(myquery, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}
exports.tinhthanh = (req, res, next) => {
      let myquery = "select * from tinhthanh where idTinh=?;";
      try {
            sql.query(myquery, req.params.idTinh, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}
exports.tongDD = (req, res, next) => {
      let myquery = "select *,COUNT(idDD) as tong from tinhthanh natural join diadanh ;";
      try {
            sql.query(myquery, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}