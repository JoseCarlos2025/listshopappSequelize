const req = require("express/lib/request");
const db = require("../model");
const ItemList = db.itemlist;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.list_name) {
        res.status(500).send({ error: "list_name is mandatory" });
    }

    const itemlist = {
        list_name: req.body.list_name,
        date_shop: req.body.date_shop
    }

    ItemList.create(itemlist).then((createdItemList) => {
        res.send(createdItemList);
    }).catch(err => {
        res.status(500).send({ message: "Server error. Couldn't add new itemlist" });
    })
}

exports.findAll = (req, res) => {
    ItemList.findAll().then((allItemlist) => {
        res.send(allItemlist);
    }).catch(err => {
        res.status(500).send({ message: "Server error. Couldn't find Itemlist" });
    })
}

exports.delete = (req, res) => {
    const itemId = req.params.id;

    ItemList.destroy({
        where: { id: itemId }
    }).then((deletedCount) => {
        if (deletedCount === 1) {
            res.send({ message: "Itemlist deleted successfully." });
        } else {
            res.status(404).send({ message: "Itemlist not found or already deleted." });
        }
    }).catch(err => {
        res.status(500).send({ message: "Server error. Couldn't delete Itemlist." });
    });
}

exports.update = (req, res) => {
    const itemId = req.params.id; // Suponiendo que pasas el ID del elemento a actualizar a través de los parámetros de la URL.

    const updatedItemList = {
        list_name: req.body.list_name,
        date_shop: req.body.date_shop
    };

    ItemList.update(updatedItemList, {
        where: { id: itemId }
    }).then((result) => {
        if (result[0] === 1) {
            res.send({ message: "Itemlist updated successfully." });
        } else {
            res.status(404).send({ message: "Itemlist not found or no changes made." });
        }
    }).catch(err => {
        res.status(500).send({ message: "Server error. Couldn't update Itemlist." });
    });
}

