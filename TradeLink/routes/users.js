/**
 * Created by sanketh on 11/26/2016.
 */
const express = require('express');
const router = express.Router();
const data = require("../data");
const userData = data.users;

router.get("/", function (request, response) {
    response.render("user/loginform");
});

module.exports = router;