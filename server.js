// var mysql = require('./app/util/mysql.util');
const config = require('./app/config');
const app = require("./app");
const Mysql = require("./app/util/mysql.util.js");

// app.listen(config.app.port,function(){
//     console.log(`http://localhost:${config.app.port}`)
// });
async function startServer() {
    try {
        await Mysql.connect(config.db.uri);
        console.log("Connected to the database!");

        const PORT = config.app.port;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log(`http://localhost:${PORT}`)
        });
    } catch (error) {
        console.log("Can connect to the database!", error);
        process.exit();
    }
}

startServer();


