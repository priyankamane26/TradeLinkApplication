/**
 * Created by sanketh on 11/28/2016.
 */


function validateUserLoginForm()
{
    console.log('userlogin.js')
    var returnresult = false;
    jQuery(function($) {
        try {
            //console.log("Form submitted");
            var email = $("#username").val();
            var password = $("#password").val();

            var errorContainer = document.getElementById("error-container");
            var errorTextElement = errorContainer.getElementsByClassName("text-goes-here")[0];
            errorContainer.classList.add("hidden");
            //alert(username);
            //alert(password);
            console.log(email);
            console.log(password);
            console.log(email);
            if (!email) throw "Must provide email.";
            if(!password || /^\s*$/.test(password) || 0 === password.length) throw "Must provide password.";
            //if (!password || password.length === 0) throw "Must provide password.";
            returnresult = true;
        }catch (e) {
            var message = typeof e === "string" ? e : e.message;
            errorTextElement.textContent = e;
            errorContainer.classList.remove("hidden");
            returnresult = false;
        }
    });

    return returnresult;
}
