/**
 * Created by Priyanka on 11/29/2016.
 */
const data = require("../data");
const mongoCollections = require("../config/mongoCollections");
const products = mongoCollections.products;
const userData = data.users;
const uuid = require('node-uuid');


let exportedMethods = {

    getProductByID(id) {
        console.log("inside getProductByID");
        return products().then((productsCollection) => {
                return productsCollection.findOne({ _id: id }).then((product) => {
                    if (!product) throw "Product  not found";
        return product;
    });
    });
    },

    getProductByUser(user) {
        return products().then((productsCollection) => {
                return productsCollection.findOne({ user: user }).then((product) => {
                    if (!product) throw "Product not found";
        return product;
    });
    });
    },

    getUserOfProduct(id) {
        console.log(id);
        return products().then((productsCollection) => {
                return productsCollection.findOne({ _id: id },{ user:1 }).then((productUser) => {
                    if (!productUser) throw "Product user not found";
        return productUser;
    });
    });
    },

    getAllProducts() {
        return products().then((productsCollection) => {
            console.log(productsCollection);
            return productsCollection.find({}).toArray();
        });
    },

    /*
        parameters: userid of currently logged in user.
        return: products which are not uploaded by current user, to display on browse products.
     */
    getAllProductsOtherUsers(userId) {
        console.log("getAllProductsOtherUsers: ", userId)
        return products().then((productsCollection) => {
            console.log(productsCollection);
            return productsCollection.find({user: {$ne: userId}}).limit(2).toArray();
        });
    },

    /*
     Parameters: user id
     return: list of products of the user provided.
     */
    getAllUserProducts(userid) {
        return products().then((productsCollection) => {
            return productsCollection.find({user:userid}).toArray().then((allUserProducts)=>{
                if (!allUserProducts) Promise.reject("User Products not found");
                console.log(allUserProducts);
                return allUserProducts;
            });

        });
    },

    /*
     Parameters: searchText
     return: list of products found based on the search text provided.
     */
    getProductsBasedOnSearch(searchText) {
        console.log("getProductsBasedOnSearch");
        console.log(searchText);
        //console.log("existing indexes: ", products.getIndexes());
        //products.createIndex({title:"text"});
        //products().ensureIndex({ title: "text"});
        return products().then((productsCollection) => {//$text: { $search: searchText }
            return productsCollection.find( {$text: { $search: searchText }} ).toArray().then((allUserProducts)=>{
                if (!allUserProducts) Promise.reject("User Products not found");
                console.log("========================================================================");
                console.log( "searchText ", allUserProducts);
                return allUserProducts;
            }).catch((e) => {
                console.log("error");
                console.log(e);

            });
        });
    },
    addProduct(requestBody,UserID) {
        console.log("addProduct===============");
        console.log(UserID);
        console.log(requestBody);

        return products().then((productsCollection) => {
            console.log("***********");
                let newProduct = {
                    _id: uuid.v4(),
                    user:UserID,
                    title: requestBody.title,
                    description: requestBody.description,
                    price:requestBody.price,
                    condition: requestBody.condition,
                    purchasedYear: requestBody.purchasedYear,
                    productImage: requestBody.image,
                    status: requestBody.status
                };
        console.log("newly created product");
        console.log(newProduct);
        return productsCollection.insertOne(newProduct).then((newProductInformation) => {
                return newProductInformation.insertedId;
    }).then((newId) => {
            console.log("new product ID");
        console.log(newId);
        return this.getProductByID(newId);
    });
    }).catch((e) => {
            console.log("Adding product exception", e);
        });
    },
    removeProduct(id) {
        return products().then((productsCollection) => {
                return productsCollection.removeOne({ _id: id }).then((deletionInfo) => {
                    if (deletionInfo.deletedCount === 0) {
            (`Could not delete product with id of ${id}`)
        }
    }).catch((err)=>{
            console.log(err);
    });
    });
    },

    updateProduct(id, updatedProduct) {
        if (!id || !updatedProduct || id == undefined || updatedProduct == undefined)
        {
            return Promise.reject("Please valid input for your product.\n");
        }

        return products().then((productsCollection) => {
                let updatedProdcutData = {};


        if (updatedProduct.title) {
            updatedProdcutData.title = updatedProduct.title;
        }

        if (updatedProduct.user) {
            updatedProdcutData.user = updatedProduct.user;
        }


        if (updatedProduct.description) {
            updatedProdcutData.description = updatedProduct.description;
        }

        if (updatedProduct.price) {
                    updatedProdcutData.price = updatedProduct.price;
        }

        if (updatedProduct.condition) {
            updatedProdcutData.condition = updatedProduct.condition;
        }

        if (updatedProduct.purchasedYear) {
            updatedProdcutData.purchasedYear = updatedProduct.purchasedYear;
        }

        if (updatedProduct.productImage) {
            updatedProdcutData.productImage = updatedProduct.productImage;
        }

        if (updatedProduct.status) {
            updatedProdcutData.status = updatedProduct.status;
        }

        let updateCommand = {
            $set: updatedProdcutData
        };
        console.log("======");
        console.log(updatedProdcutData);
        return productsCollection.updateOne({ _id: id }, updateCommand).then(() => {
                return this.getProductByID(id);
    }).catch((err)=>{
            console.log(err);
    });
    });
    }

}

module.exports = exportedMethods;
