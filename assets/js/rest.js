/*This is our custom js file*/

jQuery(function () {
    jQuery('#example').DataTable();

    jQuery("#frmCreateNewWpPost").on("submit", function () {
        //console.log(frmdata);
        //create nonce value
        jQuery.post(ajaxurl + "/api/get_nonce/?controller=posts&method=create_post", function (response) {
            var nonce = response.nonce;
            var frmdata = "nonce=" + nonce + "&" + jQuery("#frmCreateNewWpPost").serialize() + "&status=publish";

            jQuery.post(ajaxurl + "/api/posts/create_post/", frmdata, function (response) {
                alert("Post has been created");
                setTimeout(function () {
                    location.reload();
                }, 1200);
            });
        });
    });

    load_wp_posts();
});

function load_wp_posts() {
    jQuery.post(ajaxurl + "/api/get_posts/", function (response) {
        var posts = response.posts;
        var html = "";
        jQuery.each(posts, function (index, post) {
            html += '<tr><td>' + (index + 1) + '</td><td>' + post.title + '</td><td>' + post.content + '</td><td>' + post.slug + '</td><td>publish</td><td><a class="btn btn-info" href="javascript:void(0)" data-toggle="modal" data-target="#postEdit" data-id="' + post.id + '">Edit</a><a class="btn btn-danger" href="javascript:void(0)" data-id="' + post.id + '">Delete</a></td></tr>';
        });
        jQuery("#table-data").html(html);
    });
}
