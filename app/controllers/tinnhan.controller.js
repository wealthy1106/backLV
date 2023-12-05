const ApiError = require('../api_error');
const sql = require('../util/mysql.util');
//Lay ds tai khoan
exports.dstinnhan = (req, res, next) => {
      let myquery = "select  * from tinnhan ";
      try {
            sql.query(myquery, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}

exports.mottinnhan = (req, res, next) => {
      let myquery = "select  * from tinnhan where idTN=?; ";
      try {
            sql.query(myquery, req.params.idTK, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi that bai');
      }
}


exports.newtinnhan = (req, res, next) => {
      let myquery = "INSERT INTO `dulich`.`tinnhan` (`tinnhanTN`, `hotenTN`, `diachiTN`, `emailTN`) VALUES (?, ?, ?, ?);      ";
      try {
            sql.query(myquery,
                  [
                        req.body.tinnhanTN,
                        req.body.hotenTN,
                        req.body.diachiTN,
                        req.body.emailTN,
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
      let query = "UPDATE `dulich`.`tinnhan` SET `tinnhanTN` = ?, `hotenTN` = ?, `diachiTN` = ?, `emailTN` = ? WHERE (`idTN` = ?);      ";
      console.log(req.body)
      try {
            sql.query(query,
                  [
                        req.body.tinnhanTN,
                        req.body.hotenTN,
                        req.body.diachiTN,
                        req.body.emailTN,
                        req.params.idTN,
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
      let myquery = "DELETE FROM `dulich`.`tinnhan` WHERE (`idTN` = ?)";

      try {
            sql.query(myquery,
                  [req.params.idTN],
                  function (err, result, field) {
                        if (err) throw err.stack;
                        return res.json({ mes: `xóa thành công ${req.params.idTN}` });
                  })
      } catch (error) {
            return new ApiError(500, 'Không kết nối đc');
      }

}