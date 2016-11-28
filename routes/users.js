/**
 * Created by sanketh on 11/26/2016.
 */
const express = require('express');
const router = express.Router();
const data = require("../data");
const userData = data.users;

router.get("/", function (request, response) {
    //response.render("user/loginform");
    response.render("mainHomeScreen");
});

router.get("/login", function (request, response) {
    response.render("user/loginform");
});

router.get("/signup", function (request, response) {
    response.render("user/signupform");
});

router.get("/about", function (request, response) {
    response.render("aboutPage");
});

module.exports = router;