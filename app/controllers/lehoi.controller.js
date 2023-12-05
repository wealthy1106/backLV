const ApiError = require('../api_error');
const sql = require('../util/mysql.util');

exports.dslehoi = (req, res, next) => {
      let myquery = "SELECT * FROM lehoi WHERE ngayLH BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 80 DAY) ORDER BY ngayLH;";
      try {
            sql.query(myquery, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}

exports.motLH = (req, res, next) => {
      let myquery = "select  * from lehoi where idLH=?; ";
      try {
            sql.query(myquery, req.params.idLH, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}

exports.newLHoi = (req, res, next) => {
      let myquery = "INSERT INTO `dulich`.`lehoi` (`tenLH`, `hinhLH`, `motaLH`, `idTinh`, `ngayLH`) VALUES (?, ?, ?, ?, ?);";
      try {
            sql.query(myquery,
                  [
                        req.body.tenLH,
                        req.body.hinhLH,
                        req.body.motaLH,
                        req.body.idTinh,
                        req.body.ngayLH,


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
      let query = "UPDATE `dulich`.`lehoi` SET `tenLH` = ?, `hinhLH` = ?, `motaLH` = ?, `idTinh` = ?, `ngayLH` = ? WHERE (`idLH` = ?);    ";
      console.log(req.body)
      try {
            sql.query(query,
                  [
                        req.body.tenLH,
                        req.body.hinhLH,
                        req.body.motaLH,
                        req.body.idTinh,
                        req.body.ngayLH,

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
      let myquery = "DELETE FROM `dulich`.`lehoi` WHERE (`idLH` = ?);";

      try {
            sql.query(myquery,
                  [req.params.idLH],
                  function (err, result, field) {
                        if (err) throw err.stack;
                        return res.json({ mes: `xóa thành công ${req.params.idDT}` });
                  })
      } catch (error) {
            return new ApiError(500, 'Không kết nối đc');
      }

}