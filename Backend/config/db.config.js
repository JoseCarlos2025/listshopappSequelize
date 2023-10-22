module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "carlos",
    DB: "db_listshop",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 3000,
        ide: 10000
    }
};