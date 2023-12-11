const express = require("express");
const thanhtoan = require("../controllers/thanhtoan.controller");

const router = express.Router();

router.route("/")
      .get(thanhtoan.ds)
      .post(thanhtoan.new)
router.route("/updatephuongthuc/:idTT")
      .put(thanhtoan.updatephuongthuc)
router.route("/toanbo")
      .post(thanhtoan.all)
// .delete(thanhtoan.deleteAll);
router.route("/all/:idT")
      .get(thanhtoan.dsdd)

router.route("/date/:idT")
      .get(thanhtoan.ngaythang)

router.route("/:idT/idTT")
      .get(thanhtoan.motid)
      .put(thanhtoan.chinhsua)
      .delete(thanhtoan.delete);
// Định nghĩa một route để xử lý sự kiện trả về từ Vnpay
router.get('/vnpay_return', function (req, res, next) {

      // Trích xuất các tham số từ chuỗi truy vấn của yêu cầu
      var vnp_Params = req.query;

      // Lấy giá trị vnp_SecureHash từ các tham số
      var secureHash = vnp_Params['vnp_SecureHash'];

      // Loại bỏ vnp_SecureHash và vnp_SecureHashType từ các tham số
      delete vnp_Params['vnp_SecureHash'];
      delete vnp_Params['vnp_SecureHashType'];

      // Sắp xếp các tham số còn lại theo thứ tự alphabetic
      vnp_Params = sortObject(vnp_Params);

      // Tải cấu hình sử dụng gói 'config'
      var config = require('config');

      // Lấy mã thương gia Vnpay (TmnCode) và khóa bí mật (HashSecret) từ cấu hình
      var tmnCode = config.get('vnp_TmnCode');
      var secretKey = config.get('vnp_HashSecret');

      // Tải gói 'qs' để xử lý chuỗi truy vấn
      var querystring = require('qs');

      // Chuyển đổi các tham số đã sắp xếp thành một chuỗi truy vấn mà không mã hóa URL
      var signData = querystring.stringify(vnp_Params, { encode: false });

      // Tải gói 'crypto' để thực hiện các thao tác mật mã
      var crypto = require("crypto");

      // Tạo một HMAC (Hash-based Message Authentication Code) sử dụng thuật toán SHA-512
      var hmac = crypto.createHmac("sha512", secretKey);

      // Cập nhật HMAC với dữ liệu ký hiệu và tạo một bản băm thập lục phân
      var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");

      // So sánh mã ký hiệu an toàn đã tính toán với mã đã nhận được trong yêu cầu
      if (secureHash === signed) {
            // Nếu mã ký hiệu an toàn khớp, yêu cầu được coi là hợp lệ
            // Thực hiện kiểm tra bổ sung hoặc các thao tác cơ sở dữ liệu cần thiết
            // Hiển thị một trang kết quả thành công với mã phản hồi từ Vnpay
            res.render('success', { code: vnp_Params['vnp_ResponseCode'] })
      } else {
            // Nếu mã ký hiệu an toàn không khớp, yêu cầu được coi là không hợp lệ
            // Hiển thị một trang kết quả thành công với một mã lỗi tùy chỉnh ('97' trong trường hợp này)
            res.render('success', { code: '97' })
      }
});

// Hàm để sắp xếp một đối tượng theo thứ tự chữ cái của các khóa
function sortObject(obj) {
      return Object.keys(obj).sort().reduce(function (result, key) {
            result[key] = obj[key];
            return result;
      }, {});
}

module.exports = router;