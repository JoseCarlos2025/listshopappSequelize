module.exports = (sequelize, Sequelize) => {
    const ItemList = sequelize.define("itemlist", {
        list_name: {
            type: Sequelize.STRING
        },
        date_shop: {
            type: Sequelize.DATE
        }
    })

    return ItemList;
}