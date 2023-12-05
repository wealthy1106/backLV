const ApiError = require('../api_error');
const sql = require('../util/mysql.util');
//Lay ds tai khoan
exports.dsdattout = (req, res, next) => {
      let myquery = "select  * from dattour ";
      try {
            sql.query(myquery, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}

exports.mottour = (req, res, next) => {
      let myquery = "select  * from dattour where idDT=?; ";
      try {
            sql.query(myquery, req.params.idDT, (err, result, filters) => {
                  if (err) throw err.stack;
                  return res.send(result);
            })
      } catch (error) {
            return new ApiError(500, 'Ket noi tai khoan that bai');
      }
}

exports.newdattour = (req, res, next) => {
      let myquery = "INSERT INTO `dulich`.`dattour` (`idT`, `idTK`, `giaL`, `giaN`, `slL`, `slN`, `trangthai`, `hotenLL`, `emailLL`, `sdtLL`, `diachiLL`, `ngaykhoihanh`, `tongcong`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?);      ";
      try {
            sql.query(myquery,
                  [
                        req.params.idT,
                        req.body.idTK,
                        req.body.giaL,
                        req.body.giaN,
                        req.body.slL,
                        req.body.slN,
                        req.body.trangthai,
                        req.body.hotenLL,
                        req.body.emailLL,
                        req.body.sdtLL,
                        req.body.diachiLL,
                        req.body.ngaykhoihanh,
                        req.body.tongcong

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
      let query = "UPDATE `dulich`.`dattour` SET `giaL` = ?, `giaN` = ?, `slL` = ?, `slN` = ?, `trangthai` = ?, `hotenLL` = ?, `emailLL` = ?, `sdtLL` = ?, `diachiLL` = ?, `tongcong` = ? WHERE (`idDT` = ?);";
      console.log(req.body)
      try {
            sql.query(query,
                  [
                        req.body.giaL,
                        req.body.giaN,
                        req.body.slL,
                        req.body.slN,
                        req.body.trangthai,
                        req.body.hotenLL,
                        req.body.emailLL,
                        req.body.sdtLL,
                        req.body.diachiLL,
                        req.body.tongcong,
                        req.params.idDT

                  ], function (err, result, filters) {
                        if (err) throw err.stack;
                        return res.send('Cập nhật trạng thái thành công');
                  })
            console.log(query)
      } catch (error) {
            return new ApiError(500, 'Kết nối thất bại');
      }
}

exports.updateAmind = (req, res, next) => {
      let query = "UPDATE `dulich`.`dattour` SET `trangthai` = ? WHERE (`idDT` = ?);";
      console.log(req.body)
      try {
            sql.query(query,
                  [
                        req.body.trangthai,
                        req.params.idT
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
      let myquery = "DELETE FROM `dulich`.`dattour` WHERE (`idDT` = ?);";

      try {
            sql.query(myquery,
                  [req.params.idDT],
                  function (err, result, field) {
                        if (err) throw err.stack;
                        return res.json({ mes: `xóa thành công ${req.params.idDT}` });
                  })
      } catch (error) {
            return new ApiError(500, 'Không kết nối đc');
      }

}