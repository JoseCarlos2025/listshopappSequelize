const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.max,
    min: dbConfig.min,
    acquire: dbConfig.acquire,
    idle: dbConfig.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.itemlist = require("./itemlist.model")(sequelize, Sequelize);
db.items = require("./items.model")(sequelize, Sequelize);

db.itemlist.hasMany(db.items, { as: "items" });
db.items.belongsTo(db.itemlist, {
  foreignKey: "itemlistId",
  as: "itemlist",
});

module.exports = db;
