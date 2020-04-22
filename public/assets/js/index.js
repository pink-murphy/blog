jQuery || require('jquery');
// 获取
$.ajax({
    type: "GET",
    url: "/posts/count",
    success: function(res) {
        $("#posts").html('<strong>' + res.postCount + '</strong>篇文章（<strong>' + res.draftCount + '</strong>篇草稿');
    }
});
// 想服务器获取分类数据
$.ajax({
    type: "GET",
    url: "/categories/count",
    success: function(res) {
        // console.log(res);
        $("#categories").html('<strong>' + res.categoryCount + '</strong>个分类')
    }
});
// 获取评论数
$.ajax({
    type: "GET",
    url: "/comments/count",
    success: function(res) {
        // console.log(res);
        $("#comments").html('<strong>' + res.commentCount + '</strong>条评论')

    }
});