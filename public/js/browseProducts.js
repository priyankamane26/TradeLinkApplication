
function searchProducts()
{
    console.log('searching products')
    var returnresult = false;
    jQuery(function($) {
        try {
            var searchQuery = $("#searchID").val();
            console.log(searchQuery);
            if (searchQuery) {
                var requestConfig = {
                    method: "POST",
                    url: "/browse/search",
                    contentType: 'application/json',
                    data: JSON.stringify({
                        searchQuery : searchQuery
                    })
                };

                $.ajax(requestConfig).then(function (responseMessage) {
                    console.log(responseMessage.message);
                    //window.open("/products/"+responseMessage.message._id, "_self");
                });
            }

        }catch (e) {
         console.log("error in search.")
    }
    });
}
