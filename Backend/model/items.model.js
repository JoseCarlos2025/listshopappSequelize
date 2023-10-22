module.exports = (sequelize, Sequelize) => {
    const Items = sequelize.define("items", {
        name: {
            type: Sequelize.STRING
        }
    });

    return Items;
}
