jQuery || require('jquery');
$("#addCatepory").on('submit', function(e) {
    e.preventDefault;
    let formDate = $(this).serialize();
    $.ajax({
        type: "POST",
        url: "/categories",
        data: formDate,

        success: function(res) {

            location.reload();




        }
    });
});
// 1写列表模板
// 2拼接字符串
$.ajax({
    type: "GET",
    url: "/categories",
    success: function(res) {

        let html = template('cateporyTpl', { data: res });
        $("#cateporyBox").html(html);




    }
});
// 编辑文章
$("#cateporyBox").on('click', '.edit', function() {

    let id = $(this).attr('data-id');


    $.ajax({
        type: "get",
        url: "/categories/" + id,
        success: function(res) {

            console.log(res);

            let html = template('modifyCateporyTpl', res);
            $("#formBox").html(html);

        }
    });

});
// 渲染表单
$("#formBox").on('submit', '#modifyCatepory', function(e) {
    e.preventDefault;
    let id = $(this).data('id');

    $.ajax({
        type: "PUT",
        url: "/categories/" + id,
        data: $(this).serialize(),

        success: function(response) {
            location.reload();

        }
    });
});
// 删除操作
$("#cateporyBox").on('click', '.delete', function() {
    if (confirm('确认要删除吗')) {
        let id = $(this).data('id');
        $.ajax({
            type: "DELETE",
            url: "/categories/" + id,
            success: function(response) {
                location.reload();
            }
        });

    }
})