const ApiError = require('../api_error');
const sql = require('../util/mysql.util');
//Lay ds tour
exports.dstour = (req, res, next) => {
      let myquery = "select  * from tour natural join lichtrinh limit 3";
      try {
            sql.query(myquery, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Lỗi kết nối server');
      }
}

exports.tourNB = (req, res, next) => {
      let myquery = "select *,date_format(ngaykhoihanh,'%d/%m/%y') as dateKH from tourNB natural join tour natural join lichtrinh limit 3";
      try {
            sql.query(myquery, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Lỗi kết nối server');
      }
}

exports.dstour1 = (req, res, next) => {
      let myquery = "select  * from tour natural join lichtrinh limit 3,3";
      try {
            sql.query(myquery, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Lỗi kết nối server');
      }
}

exports.dstour2 = (req, res, next) => {
      let myquery = "select  * from tour natural join lichtrinh limit 6,3";
      try {
            sql.query(myquery, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Lỗi kết nối server');
      }
}

//lay 1 tour
exports.mottour = (req, res, next) => {
      let myquery = "select  * from tour where idT=?; ";
      try {
            sql.query(myquery, req.params.idT, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}


exports.newtour = (req, res, next) => {
      let myquery = "INSERT INTO `dulich`.`tour` (`tenT`, `chitietT`, `loaiT`, `khoihanhT`, `noikhoihanh`, `giaT`, `trainghiem`, `tgian`, `idDD`) VALUES (?,?,?,?,?,?,?,?,?);";
      try {
            sql.query(myquery,
                  [
                        req.body.tenT,
                        req.body.chitietT,
                        req.body.loaiT,
                        req.body.khoihanhT,
                        req.body.noikhoihanh,
                        req.body.giaT,
                        req.body.trainghiem,
                        req.body.tgian,
                        req.body.idDD,
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
      let query = "UPDATE `dulich`.`tour` SET `tenT` = ?, `chitietT` = ?, `loaiT` = ?, `khoihanhT` = ?, `noikhoihanh` = ?, `giaT` = ?, `trainghiem` = ?, `tgian` = ? WHERE (`idT` = ?);";
      // console.log(req.body)
      try {
            sql.query(query,
                  [
                        req.body.tenT,
                        req.body.chitietT,
                        req.body.loaiT,
                        req.body.khoihanhT,
                        req.body.noikhoihanh,
                        req.body.giaT,
                        req.body.trainghiem,
                        req.body.tgian,
                        req.params.idT,
                  ], function (err, result, filters) {
                        if (err) throw err.stack;
                        return res.send('Cập nhật trạng thái thành công');
                  })
            console.log(query)
      } catch (error) {
            return new ApiError(500, 'Kết nối thất bại');
      }
}

// exports.delete = async (req, res, next) => {
//       let myquery = "DELETE FROM `dulich`.`tour` WHERE (`idT` = ?);";

//       try {
//             sql.query(myquery,
//                   [req.params.idT],
//                   function (err, result, field) {
//                         if (err) throw err.stack;
//                         return res.json({ mes: `xóa thành công phong ${req.params.idT}` });
//                   })
//       } catch (error) {
//             return new ApiError(500, 'Không kết nối đc');
//       }

// }


exports.update = (req, res, next) => {
      let query = "UPDATE `dulich`.`tour` SET `tenT` = ?, `chitietT` = ?, `loaiT` = ?, `khoihanhT` = ?, `noikhoihanh` = ?, `giaT` = ?, `trainghiem` = ?, `tgian` = ? WHERE (`idT` = ?);";
      console.log(req.body)
      try {
            sql.query(query,
                  [
                        req.body.tenT,
                        req.body.chitietT,
                        req.body.loaiT,
                        req.body.khoihanhT,
                        req.body.noikhoihanh,
                        req.body.giaT,
                        req.body.trainghiem,
                        req.body.tgian,
                        req.params.idT,
                  ], function (err, result, filters) {
                        if (err) throw err.stack;
                        return res.send('Cập nhật trạng thái thành công');
                  })
            console.log(query)
      } catch (error) {
            return new ApiError(500, 'Kết nối thất bại');
      }
}