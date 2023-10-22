module.exports = app => {
    const item = require("../controller/items.controller");

    var router = require("express").Router();

    router.post("/",item.create);

    router.get("/:id",item.findAllItemsInItemlist);

    router.put("/:id",item.update);

    router.delete("/:id",item.delete);

    app.use("/api/items", router);
}