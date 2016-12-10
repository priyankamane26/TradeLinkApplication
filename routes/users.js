/**
 * Created by sanketh on 11/26/2016.
 */
const data = require("../data");
const express = require('express');
var fs = require('fs');
const path = require('path');
const passport = require("passport");
const router = express.Router();
const userData = data.users;
const productData = data.products;
var xss = require('xss');


router.get("/", function (request, response) {
    console.log("session check in /");
    console.log(request.session.passport)
    if(request.session.passport && request.session.passport.user)
        response.redirect("/myprofile");
    else
        response.render("mainHomeScreen", {partial:"home-scripts"});
});

router.get("/successfulSignup", function(request, response) {
    response.render("user/successSignupScreen", {partial:"home-scripts"});
});

router.get("/login", function (request, response) {
    console.log("Get Method for login form.");
    console.log("session check in /login");
    if(request.session.passport && request.session.passport.user)
        response.redirect("/myprofile");
    else
        response.render("user/loginform", {partial:"userlogin-scripts", message: request.flash('message')});
});

router.get("/myprofile", function(request, response) {
    //console.log(request.user);
    if(request.user === undefined) response.redirect('/login');
    else response.render('user/myprofile', { user: request.user, partial:"mainscreen-scripts" });
});

router.post('/login', passport.authenticate('login', {
    successRedirect: '/myprofile',
    failureRedirect: '/login',
    failureFlash : true
}));

router.get('/logout', function(request, response){
    request.logout();
    response.redirect('/login');
});

router.get("/signup", function (request, response) {
    //console.log("Get Method for signup form.")
    response.render("user/signupform",  {partial:"mainscreen-scripts"});
});

router.post("/signup", function (request, response) {
    console.log("request.file check");
    //console.log(request.body.file);
        var requestData = request.body;
        userData.addUser(request.body)
            .then((newUser) => {
                //console.log("New User Added!");
                response.redirect("/successfulSignup");
                //response.json({ success: true, message: newUser});
            }).catch((e) => {
                //console.log("*********");
                console.log(e);
                //response.json({ error: true, message:"Email already exists."});
            response.render("user/signupform",{error: e,partial:"mainscreen-scripts",firstname: xss(requestData.firstname), lastname: xss(requestData.lastname), gender: requestData.gender, email:xss(requestData.email),password:requestData.password,
                userphone:xss(requestData.userphone),address:xss(requestData.address),city:xss(requestData.city),state:xss(requestData.state),zipcode:xss(requestData.zipcode)});
            //return;
        });
    //response.render("user/signupform",  {partial:"mainscreen-scripts"});
});

router.post("/login", function (request, response) {
    console.log("Post Method for login form.")
    //response.render("user/signupform",  {partial:"mainscreen-scripts"});
});

router.get("/about", function (request, response) {
    response.render("aboutPage", {partial:"userlogin-scripts"});
});

router.get("/forgotpassword", function (request, response) {
    response.render("user/forgotpassword", {partial:"userlogin-scripts"});
});

router.post("/forgotpassword", function (request, response) {
    userData.getUserByEmail(request.body.username).then((user)=>{
        console.log(user);
        response.render("user/securityQuestion", {partial:"security-scripts", user: user});
    }).catch(() => {
        response.render("user/forgotpassword", {partial:"userlogin-scripts", message:"Email not registered."});
    });
});

router.post("/checkSecurity", function (request, response) {
    console.log(request.body.cnfpassword);
    //update user  DB
    userData.updateUser(request.body.cnfpassword, request.body.email).then((user)=>{
        console.log(user);
        response.redirect("/login");
    }).catch(() => {
        response.json({ error: true, message:"User not updated!"});
    });
});

module.exports = router;
