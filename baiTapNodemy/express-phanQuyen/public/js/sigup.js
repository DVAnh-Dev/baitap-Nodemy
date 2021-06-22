// Tạo user
$('.create').click(()=>{
    let username = $('.user').val()
    let password = $('.pass').val()
    let role = $('.role').val()
    $.ajax({
        url:'/index/sigup',
        type:'POST',
        data:{
            username,
            password,
            role:role
        }
    }).then(data=>{
        $('.note').html(data.mess)
    }).catch(err=>{console.log(err);})
})
// Tạo hàng Hóa


