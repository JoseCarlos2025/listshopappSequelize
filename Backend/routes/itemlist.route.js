module.exports = app => {
    const itemList = require("../controller/itemlist.controller");

    var router = require("express").Router();

    router.post("/",itemList.create);

    router.get("/",itemList.findAll);

    router.put("/:id",itemList.update);

    router.delete("/:id",itemList.delete);

    app.use("/api/itemlist", router);
}