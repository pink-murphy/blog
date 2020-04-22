jQuery || require('jquery');
$.ajax({
    type: "GET",
    url: "/categories",
    success: function(res) {
        let html = template('cateporyTpl', { data: res });
        $("#category").html(html);

    }
});
// 上传文件图片
$("#feature").on('change', function() {
    let formDate = new FormData();
    formDate.append('cover', this.files[0]);
    $.ajax({
        type: "POST",
        url: "/upload",
        data: formDate,
        processData: false,
        contentType: false,
        success: function(res) {
            $("#thumbnail").val(res[0].cover);

        }
    });
});
$("#addForm").on('submit', function(e) {
    e.preventDefault;
    // 获取管理员在表单输入的内容
    let formDate = $(this).serialize();
    $.ajax({
        type: "POST",
        url: "/posts",
        data: formDate,
        success: function() {
            location.href = '/admin/posts.html';
        }
    });
});
// 修改文章
// 从浏览器地址栏获取参数
let id = getUrlParams('id');
if (id != -1) {
    $.ajax({
        type: "get",
        url: "/posts/" + id,


        success: function(data) {
            console.log(data);


            $.ajax({
                type: "GET",
                url: "/categories",
                success: function(res) {
                    data.categores = res;
                    let html = template('modifyTpl', data)
                    $("#parentBox").html(html);

                }
            });
        }
    });
}

function getUrlParams(name) {
    let temp1 = location.search.substr(1).split("&");
    for (let i = 0; i < temp1.length; i++) {
        let arr = temp1[i].split('=');
        if (arr[0] == name) {
            return arr[1]
        }
    }
    return -1;

};
// 文章修改提交
$("#parentBox").on('submit', '#modifyForm', function(e) {
    e.preventDefault();
    // 获取表单的id
    let id = $(this).data('id');
    // 获取表单的内容
    let formDate = $(this).serialize();
    $.ajax({
        type: "put",
        url: "/posts/" + id,
        data: formDate,
        success: function(response) {
            location.href = "./posts.html"
        }
    });

})