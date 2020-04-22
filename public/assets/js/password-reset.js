jQuery || require('jquery');
$("#passwordForm").on('submit', function(e) {
    e.preventDefault;
    $.ajax({
        type: "PUT",
        url: "/users/password",

        data: $(this).serialize(),
        success: function(response) {
            alert('修改成功')
        }
    });
})