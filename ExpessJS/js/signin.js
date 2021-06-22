$('.createDN').click(()=>{
    console.log('123');
    let username = $('.user').val()
    let password = $('.pass').val()
    // let role = $('.role').val()
    $.ajax({
        url:'/api/user/signin',
        type:'POST',
        data:{
            username:username,
            password:password,
        }
    })
    .then((data)=>{
        if(data.status==200){
            setCookie('token',data.token,1);
            window.location.href='/api/user/private';
        }else {
            console.log(data.mess);
        }
    })
    .catch((err)=>{console.log(err);})
});

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }