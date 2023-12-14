const ApiError = require('../api_error');
const sql = require('../util/mysql.util');

exports.ds = (req, res, next) => {
      let myquery = "select  * from Tour_diadanh ";
      try {
            sql.query(myquery, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Lỗi kết nối server');
      }
}

//Lay thông tin đầy đủ 1 tour
exports.mot = (req, res, next) => {
      let myquery = "select * from Tour_diadanh where idTDD=?;";
      try {
            sql.query(myquery, [req.params.idTDD], (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi that bai');
      }
}

exports.motDD = (req, res, next) => {
      let myquery = "select * from diadanh natural join tour natural join lichtrinh natural join tour_diadanh where idDD=?;";
      try {
            sql.query(myquery, [req.params.idDD], (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi that bai');
      }
}

exports.timkiemDD = (req, res, next) => {
      let myquery = "select * from diadanh natural join tour natural join lichtrinh natural join tinhthanh natural join tour_diadanh where tenDD like ?;";
      try {
            sql.query(myquery, [`%${req.params.tenDD}%`], (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi that bai');
      }
}

exports.new = (req, res, next) => {
      let myquery = "INSERT INTO `dulich`.`tour_diadanh` (`idT`, `idDD`, `tieude`) VALUES (?, ?, ?);";
      try {
            sql.query(myquery,
                  [
                        req.body.idT,
                        req.body.idDD,
                        req.body.tieude,
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
      let query = "UPDATE `dulich`.`tour_diadanh` SET `idT` = ?, `idDD` = ?, `tieude` = ? WHERE (`idTDD` = ?);";
      console.log(req.body)
      try {
            sql.query(query,
                  [
                        req.body.idT,
                        req.body.idDD,
                        req.body.tieude,
                        req.params.idTDD,
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
      let myquery = "DELETE FROM `dulich`.`Tour_diadanh` WHERE (`idTDD` = ?);";

      try {
            sql.query(myquery,
                  [req.params.idTDD],
                  function (err, result, field) {
                        if (err) throw err.stack;
                        return res.json({ mes: `xóa thành công ${req.params.idTDD}` });
                  })
      } catch (error) {
            return new ApiError(500, 'Không kết nối đc');
      }

}