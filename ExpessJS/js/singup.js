$('.create').click(()=>{
    let username = $('.user').val()
    let password = $('.pass').val()
    let role = $('.role').val()
    $.ajax({
        url:'/api/user/signup',
        type:'POST',
        data:{
            username:username,
            password:password,
            role:role
        }
    }).then(data=>{
        $('.noti').html(data.mess)
    }).catch(err=>{console.log(err);})
})
