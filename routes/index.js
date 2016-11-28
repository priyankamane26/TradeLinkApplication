/**
 * Created by sanketh on 11/26/2016.
 */
const users = require("./users");
const data = require("../data");
const usersData = data.users;
const path = require('path');


const constructorMethod = (app) => {
    app.use("/", users);

    app.use("*", (req, res) => {
        let route = path.resolve(`static/errorPage.html`);
        res.status(404).sendFile(route);
    })
};

module.exports = constructorMethod;