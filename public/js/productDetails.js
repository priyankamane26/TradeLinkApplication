/**
 * Created by Priyanka on 11/29/2016.
 */

function editProduct() {
        jQuery(function($) {
        try {

            var productID = $("#updateProductID").val();
            console.log($("#updateProductID").val());
            if (productID) {
                //console.log("requestCOnfig setup");
                //noinspection JSAnnotator
                var requestConfig = {
                    method: "POST",
                    url: "/products/editProduct/edit",
                    contentType: 'application/json',
                    data: JSON.stringify({
                        productID : productID
                    })
                };

                $.ajax(requestConfig).then(function (responseMessage) {
                    console.log("response");
                    console.log(responseMessage.message);
                    //window.open("/products/"+responseMessage.message._id, "_self");
                });
            } 
        }catch (e) {
            console.log(e);
            var message = typeof e === "string" ? e : e.message;
            
        }
    });
}