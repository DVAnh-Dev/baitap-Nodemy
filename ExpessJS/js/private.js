$.ajax({
    url:'/api/user/private',
    type:'POST'
}).then((data)=>{
    console.log(data);
    if(data.status !== 200){
        window.location.href='/api/user/signin';
    }
})
.catch((err)=>{console.log(err);
    window.location.href='/api/user/signin';
})
$.ajax({
    url:'/api/user/private/'+getCookie('token'),
    type:'POST'
})
.then((data)=>{
    console.log(data);
    $('body').append(`welcome ${data.data}`);
})
.catch((err)=>{console.log(err);
    window.location.href='/api/user/signin';
});

function delete_cookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }; 
$('.out').click(()=>{
    $.ajax({
        url:'/api/user/signout',
        type:'post'
    })
    .then(data=>{

            console.log(35,data);
          delete_cookie('token');
        window.location.href='/api/user/signin';

        // console.log(100);
    })
    .catch(err=>{console.log(err);})
})
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  