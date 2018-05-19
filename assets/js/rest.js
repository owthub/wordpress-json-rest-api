/*This is our custom js file*/

jQuery(function () {
    jQuery('#example').DataTable();

    jQuery("#frmCreateNewWpPost").on("submit", function () {
        //console.log(frmdata);
        //create nonce value
        jQuery.post(ajaxurl + "/api/get_nonce/?controller=posts&method=create_post", function (response) {
            var nonce = response.nonce;
            var frmdata = "nonce=" + nonce + "&" + jQuery("#frmCreateNewWpPost").serialize()+"&status=publish";

            jQuery.post(ajaxurl + "/api/posts/create_post/", frmdata, function (response) {
                console.log(response);
            });
        });
    });
});
