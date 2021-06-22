function render(){
    $('.todo').html('');
    $('.doing').html('');
    $('.done').html('');
    $.ajax({
        url:'/todolist/getAll',
        type:'get'
    }).then((data)=>{
        // console.log(data.data);
        // console.log(data);
        for(let i =0 ;i < data.length;i++){
            let bang =`
            <div class='task' id='${data[i]._id}'>
                <div>
                <div class='line'>
                <div class='line-text'>title: </div>  <div>${data[i].title}</div>
              </div>
      
              <div class='line'>
                <div class='line-text'>description: </div> <div>${data[i].descrition}</div>
              </div>
      
              <div class='line'>
                <div class='line-text'>date: </div> <div>${data[i].Date}</div>
              </div>
              <div class='line'>
            </div>
                </div>
                <div>
                 <button onclick='xoa("${data[i]._id}")'> xoa </button>
                 <button onclick='sua("${data[i]._id}")'> Sửa </button>

                </div>
          </div>
            `;
            $(`.${data[i].status}`).append(bang);
        }
    })
    .catch((err)=>{
        console.log(err);
    })
}
render();
 function xoa(id){
    //  console.log(id);
     $.ajax({
         url:'/api/user/todo/delete/'+id,
         type:'DELETE'
     }).then((data)=>{
         console.log(data);
        render();
        })
     .catch((err)=>{console.log(err);})
 };
// sửa
function sua(id){
    console.log(id);
     modal.style.display = "block";
    $('.suasp').attr('onclick',`sua01('${id}')`)
    // $.ajax({
    //     url:'/api/user/todo/suasp/'+id,
    //     type:'PUT'
    // }).then((data)=>{
    //     console.log(data);
    //    render();
    //    })
    // .catch((err)=>{console.log(err);})
};
function sua01(id){
    let title = $('.title').eq(1).val()
    let description = $('.description').eq(1).val()
    let date = $('.date').eq(1).val()
    let status = $('.status').eq(1).val()

    console.log(status);
    $.ajax({
        url:'/api/user/todo/suasp/'+id,
        type:'PUT',
        data:{
            title:title,
            description:description,
            date:date,
            status:status
        }
    })
    .then((data)=>{
        console.log(data);
       render();
       modal.style.display = "none";

       })
    .catch((err)=>{console.log(err);})
}
// $('.suasp').click(()=>{
//    
//     $.ajax({
//         url:'/api/user/todo/suasp'+id,
//         type:'PUT',
//         data:{
//             title:title,
//             description:description,
//             date:date,
//             status:status
//         }
//     }).then(data=>{
//         console.log(data);
//         render();
//         $('.noti').html(data.mess)
//     }).catch(err=>{console.log(err);})
// })
 // tạo sp
 $('.taosp').click(()=>{
    let title = $('.title').val()
    let description = $('.description').val()
    let date = $('.date').val()
    let status = $('.status').val()
    $.ajax({
        url:'/api/user/todo/taosp',
        type:'POST',
        data:{
            title:title,
            description:description,
            date:date,
            status:status
        }
    }).then(data=>{
        console.log(data);
        render();
        $('.noti').html(data.mess)
    }).catch(err=>{console.log(err);})
})
// sua 
// ​// Get the modal
var modal = document.getElementById("myModal");

// // Get the button that opens the modal
var btn = document.getElementById("myBtn");

// // Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// // When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// // When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// // When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
