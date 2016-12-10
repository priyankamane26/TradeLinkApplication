const data = require("../data");
const express = require('express');
const passport = require("passport");
const path = require('path');
const productData = data.products;
const router = express.Router();


router.get("/", (req, res) => {
    console.log("Browsing products...");
    console.log(req.session.passport);
    if (req.session.passport && req.session.passport.user) {
        //productData.getAllProducts().then((allProducts)=>{ //This method gives currently logged in user's products in results.
        productData.getAllProductsOtherUsers(req.session.passport.user._id).then((allProducts)=>{
          console.log("Returned products:");
          console.log(allProducts);
          console.log(req.user);
          res.render("product/browseProducts", { partial: "browse-products-scripts", user: req.user,products: allProducts});
          
        }).catch(() => {
            res.redirect("/");
        });
    }
    else {
        res.redirect("/login");
    }
});

router.post("/search", (req, res) => {
    console.log("Browsing Search products...");
    console.log(req.body.searchQuery);
    if (req.session.passport && req.session.passport.user) {

            productData.getProductsBasedOnSearch(req.body.searchQuery).then((searchResultProducts)=>{
                console.log("searchResultProducts:");
                console.log(searchResultProducts);
                res.render("product/browseProducts", { partial: "browse-products-scripts", searchproducts: searchResultProducts ,user: request.user});
            }).catch(() => {
                res.render("product/browseProducts", { partial: "browse-products-scripts", products: productList,user: request.user});
                //res.redirect("/");
            });
/*        let productList;
        productData.getAllProductsOtherUsers(req.session.passport.user).then((allProducts)=>{
            productList = allProducts;
            productData.getProductsBasedOnSearch(req.body.searchQuery).then((searchResultProducts)=>{
                console.log("searchResultProducts:");
                console.log(searchResultProducts);
                res.render("product/browseProducts", { partial: "browse-products-scripts", products: allProducts, searchproducts: searchResultProducts });
            })
        }).catch(() => {
            res.render("product/browseProducts", { partial: "browse-products-scripts", products: productList });
            //res.redirect("/");
        });*/
    }
    else {
        res.redirect("/login");
    }
});

module.exports = router;
