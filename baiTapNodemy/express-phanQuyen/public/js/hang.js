
$('.createHang').click(()=>{
    let ten = $('.ten').val()
    let gia = $('.gia').val()
    let soluong = $('.soluong').val()
    $.ajax({
        url:'/hang',
        type:'POST',
        data:{
            ten,
            gia,
            soluong
        }
    }).then(data=>{
        $('.note').html(data.mess)
    }).catch(err=>{console.log(err);})
})