function upload(){
    var form = $('form')[0]
    var formData = new FormData(form)
    $.ajax({
        url:'/profile',
        type:'POST',
        data:formData,
        contentType: false,
        processData: false,
    })
    .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        // res.json(err);
      });
}