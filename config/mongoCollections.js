const dbConnection = require("./mongoConnection");

/* This will allow you to have one reference to each collection per app */
let getCollectionFn = (collection) => {
    let _col = undefined;

    return () => {
        if (!_col) {
            _col = dbConnection().then(db => {
                db1 = db.collection(collection);
                if(collection == "products") {
                    db1.createIndex({title: "text", year: "text", price: "text", description: "text"})
                }
                return db1;
                //return db.collection(collection);
            });
        }
        return _col;
    }
}

/* Now, you can list your collections here: */
module.exports = {
    users: getCollectionFn("users"),
    products: getCollectionFn("products"),
};
