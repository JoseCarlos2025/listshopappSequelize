const express = require("express");
const cors =require("cors");

var path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const corsOptions = {
    origin: '*'
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({extended: true}));

const db = require("./model");

db.sequelize.sync({force: true}).then(()=>{
    console.log("Drop and re-sync db.");
});

app.get("/", (req, res) =>{
    res.json({nessge: "welcome to listshop application."});
})

require("./routes/itemlist.route")(app);

require("./routes/items.route")(app);

const PORT = process.env.PORT || 8800;

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}.`);
});
