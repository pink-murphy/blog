jQuery || require('jquery');
// 创建评论
// for (let i = 1; i < 6; i++) {
//     $.ajax({
//         type: "POST",
//         url: "/comments",
//         data: {
//             author: '5e9be1b1bf8668091cf35c05',
//             content: `第${i}个评论`,
//             post: '5e9eac360ba2c65ae02eddc3'
//         },
//         success: function(response) {

//         }
//     });
// }
// 想服务器发送请求
function changePage(page) {
    $.ajax({
        type: "GET",
        url: "/comments",
        data: { page: page },
        success: function(res) {


            let html = template('commentsTpl', res);
            $("#commentsBox").html(html);
            let pageHtml = template('pageTpl', res);
            $("#pageBox").html(pageHtml);

        }
    });
}
changePage();
// 修改评论状态
$("#commentsBox").on('click', '.status', function(e) {
    e.preventDefault();
    let id = $(this).data('id');
    let state = $(this).attr('data-state');
    //这里是没问题的

    $.ajax({
        type: "PUT",
        url: "/comments/" + id,
        data: {
            state: state == 1 ? 0 : 1
        },
        success: function() {

            location.reload();
        }
    });
});
// 删除评论
$("#commentsBox").on('click', '.delete', function(e) {
    e.preventDefault();
    if (confirm('确认要删除吗')) {
        let id = $(this).data('id');
        $.ajax({
            type: "DELETE",
            url: "/comments/" + id,
            success: function() {
                location.reload();
            }
        });

    }

})