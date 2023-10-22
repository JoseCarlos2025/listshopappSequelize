const req = require("express/lib/request");
const db = require("../model");
const Items = db.items;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(500).send({ error: "name is mandatory" });
  }

  const item = {
    name: req.body.name,
    itemlistId: req.body.itemlistId
  }

  Items.create(item).then((createdItem) => {
    res.send(createdItem);
  }).catch(err => {
    res.status(500).send({ message: "Server error. Couldn't add a new item" });
  })
}

exports.findAll = (req, res) => {
  Items.findAll().then((allItems) => {
    res.send(allItems);
  }).catch(err => {
    res.status(500).send({ message: "Server error. Couldn't find items" });
  })
}

exports.findAllItemsInItemlist = (req, res) => {
  const id = req.params.id;
  Items.findAll({
    where: { itemlistId: id },
    order: [["id"]],
  })
    .then((data) => {
      return res.send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error occurred while retrieving items.",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const updatedData = req.body; 

  
  Items.update(updatedData, { where: { id } })
    .then((result) => {
      if (result[0] === 1) {
        res.send({ message: "Elemento actualizado exitosamente." });
      } else {
        res.status(404).send({ message: `No se encontró el elemento con el ID ${id}` });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error del servidor al actualizar el elemento." });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Items.destroy({ where: { id } })
    .then((result) => {
      if (result === 1) {
        res.send({ message: "Elemento eliminado exitosamente." });
      } else {
        res.status(404).send({ message: `No se encontró el elemento con el ID ${id}` });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error del servidor al eliminar el elemento." });
    });
};
