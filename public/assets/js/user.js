jQuery || require('jquery');

// 添加用户
$("#userForm").on('submit', function() {
    // event.preventDefault();
    let formData = $(this).serialize();
    $.ajax({
        type: "POST",
        url: "/users",
        data: formData,
        success: function(response) {
            location.reload();

        }
    });
    return false;

});
// 上传头像s

$("#modifyBox").on('change', '#avatar', function() {
        // 创建formData对象
        let formData = new FormData();
        formData.append('avatar', this.files[0]);
        $.ajax({
            type: "POST",
            url: "/upload",
            data: formData,
            processData: false,
            contentType: false,
            success: function(res) {
                console.log(res);

                // 实现预览功能
                $("#preview").attr('src', res[0].avatar)
                    // 隐藏域的地址
                $("#avatarHidden").val(res[0].avatar);


            }

        });

    })
    // 获取用户数据
$.ajax({
    type: "get",
    url: "/users",
    success: function(res) {
        let html = template('userTpl', { data: res });
        $("#userBox").html(html);

    }
});
$("#userBox").on('click', '.edit', function() {
        let id = $(this).attr('data-id');
        console.log(id);

        $.ajax({
            type: "get",
            url: "/users/" + id,
            success: function(res) {
                console.log(res);

                let html = template('modifyTpl', res);
                $("#modifyBox").html(html);
            }
        });
    })
    // 为修改表单提交事件
$("#modifyBox").on('submit', '#modifyForm', function() {
    let formData = $(this).serialize();
    let id = $(this).attr('data-id');
    $.ajax({
        type: "put",
        url: "/users/" + id,
        data: formData,
        success: function(res) {

            location.reload();

        }
    });
    return false;
});
// 删除用户
$("#userBox").on('click', '.delete', function() {
    let id = $(this).attr('data-id');
    if (confirm('确认要删除吗')) {
        $.ajax({
            type: "DELETE",
            url: "/users/" + id,
            success: function(res) {

                location.reload();
            }
        });
    }

});
// 批量删除
let select = $("#checkedAll");
select.on('change', function() {
    let status = $(this).prop('checked');

    if (status) {
        $("#deleteMany").show();
    } else {
        $("#deleteMany").hide();

    }
    $("#userBox").find('input').prop('checked', status)

});

let inputs = $("#userBox").find('input');
$("#userBox").on('change', 'input', function() {
    if ($("#userBox input:checked").length > 0) {
        $("#deleteMany").show();
    } else {
        $("#deleteMany").hide();
    }
    if ($("#userBox input:checked").length == inputs.length) {
        select.prop('checked', true);

    }
});
$("#deleteMany").on('click', function() {
    let ids = [];
    $("#userBox input:checked").each(function() {
        let id = $(this).attr('data-id');
        ids.push(id);
        $.ajax({
            type: "method",
            url: "url",
            data: "data",
            dataType: "dataType",
            success: function(response) {

            }
        });
    })
})