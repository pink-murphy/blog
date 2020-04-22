jQuery || require('jquery');
$.ajax({
    type: "GET",
    url: "/posts",
    success: function(res) {
        console.log(res);

        let html = template('postTpl', res);
        $("#postsBox").html(html);
        let page = template('pageTpl', res);
        $("#pageBox").html(page);
    }
});
// 事件格式处理
function fn(date) {
    date = new Date(date);
    // return date.getFullYear() + '-' + (date.getMonth + 1) + '-' + date.getDate();
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

function changePage(page) {
    $.ajax({
        type: "GET",
        url: "/posts",
        data: { page: page },
        success: function(res) {
            console.log(res);
            let html = template('postTpl', res);
            $("#postsBox").html(html);
            let page = template('pageTpl', res);
            $("#pageBox").html(page);
        }
    });
}
// 向服务器获取分类信息
$.ajax({
    type: "GET",
    url: "/categories",
    success: function(res) {
        let html = template('cateporyTpl', { data: res })
        $("#classBox").html(html);
    }
});
$("#cateporyForm").submit(function(e) {
    e.preventDefault();
    let formDate = $(this).serialize();
    $.ajax({
        type: "GET",
        url: "/posts",
        data: formDate,
        success: function(res) {
            let html = template('postTpl', res);
            $("#postsBox").html(html);
            let page = template('pageTpl', res);
            $("#pageBox").html(page);

        }
    });
});
// 根据id删除文章
$("#postsBox").on('click', '.delete', function() {
    if (confirm('确认要删除吗')) {
        // 获取当前id
        let id = $(this).attr('data-id');
        alert(id)
        $.ajax({
            type: "DELETE",
            url: "/posts/" + id,
            success: function() {
                location.reload();
            }
        });

    }
})