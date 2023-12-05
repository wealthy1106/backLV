const config = {
      app: {
            port: process.env.PORT || 3000,
      },
      db: {
            host: "localhost",
            user: "root",
            password: "",
            database: "dulich"
      }
};
module.exports = config;