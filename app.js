const express = require("express");
const cors = require("cors");
// const contactsRouter = require("./app/routes/contact.route");
const ApiError = require("./app/api_error");
const taikhoanRouter = require("./app/routes/taikhoan.js")
const diachiLH = require("./app/routes/lienhe.js")
const diadanhRouter = require("./app/routes/diadanh.js")
const tourRouter = require("./app/routes/tour.js")
const dattourRouter = require("./app/routes/dattour.js")
const tinnhanRouter = require("./app/routes/tinhnhan.js")
const lichtrinhRouter = require("./app/routes/lichtrinh.js")
const khuyenmaiRouter = require("./app/routes/khuyenmai.js")
const thanhtoanRouter = require("./app/routes/thanhtoan.js")
const TDDRouter = require("./app/routes/T_DD.js")
const TTHKRouter = require("./app/routes/TTHK.js")
const lehoiRouter = require("./app/routes/lehoi.js")
const vetourRouter = require("./app/routes/vetour.js")


const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const app = express();

// app.use(cors());
app.use(cors({
    origin: '*',
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//         res.json({ massage: "Welcome to contact book application." });
// });

app.use("/api/lienhe", diachiLH);
app.use("/api/diadanh", diadanhRouter);
app.use("/api/taikhoan", taikhoanRouter);
app.use("/api/tour/", tourRouter);
app.use("/api/tinnhan", tinnhanRouter);
app.use("/api/dattour", dattourRouter);
app.use("/api/lichtrinh", lichtrinhRouter);
app.use("/api/khuyenmai", khuyenmaiRouter);
app.use("/api/thanhtoan", thanhtoanRouter);
app.use("/api/TTHK", TTHKRouter);
app.use("/api/TDD", TDDRouter);
app.use("/api/lehoi", lehoiRouter);
app.use("/api/vetour", vetourRouter);

let pageViews = 0;

app.get('/api/page-views', (req, res) => {
    res.json({ pageViews });
});

app.post('/api/page-views/increment', (req, res) => {
    pageViews++;
    res.json({ success: true });
});

app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

// let pageViewsHistory = [];

// app.get('/api/page-views', (req, res) => {
//     res.json({ pageViews: pageViewsHistory });
// });

// app.post('/api/page-views/increment', (req, res) => {
//     const currentDate = new Date().toISOString().split('T')[0]; // Lấy ngày hiện tại
//     const existingEntry = pageViewsHistory.find(entry => entry.date === currentDate);

//     if (existingEntry) {
//         existingEntry.pageViews++;
//     } else {
//         pageViewsHistory.push({ date: currentDate, pageViews: 1 });
//     }

//     res.json({ success: true });
// });

app.use((error, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
    });
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://tpg-tourism.web.app');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

module.exports = app;