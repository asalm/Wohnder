// Source: https://codepen.io/developingidea/pen/meAIn


$(document).ready(function(){
  var data = databasehandler();
  addCards(data);
  /*
    <div class="buddy" style="display: block;">
      <div class="avatar"  style="display: block; background-image: url(https://1.bp.blogspot.com/_qEbjiFbQWGM/TCBVlN3mkYI/AAAAAAAADCM/7CjYqUHwbgY/s1600/workshop_modell_0126.jpg)">
      </div>
      <h1 class="title">Title</h1>
      <p class="has-text-black">Short description is super important so the user knows whats up with the flat they are trying to check out!</p>
      <ol class="info">
        <li>320€</li>
        <li>17qm²</li>
        <li>3 MB</li>
      </ol>
    <div>
  */

  function addCards(data){

    var backgroundimg = "https://1.bp.blogspot.com/_qEbjiFbQWGM/TCBVlN3mkYI/AAAAAAAADCM/7CjYqUHwbgY/s1600/workshop_modell_0126.jpg"
    var outerBody = document.createElement('div');
    var avatar = document.createElement('div');
    outerBody.classList.add('buddy');
    outerBody.style = "display:block";
    avatar.classList.add('avatar');
    avatarBody.style = "display:block; background-image: url(" + backgroundimg + ")"; 
    outerBody.appendChild(avatar);


    document.getElementById('card-container').appendChild(outerBody);
  }

  function databasehandler(){
    console.log("test");
    $.get("http://localhost:8081/getWohnung", function(data, status){
      //alert("Data: " + data + "\nStatus: " + status);
      return data;
    });
    /*
    $.ajax({
      type: 'GET',
      url: 'localhost:8081/getWohnung',
      dataType: 'json',
      success: function( data){
        console.log(data);

      }
    });*/
  }

  //Menu Activation Handler
    $('ol li').click(function(){
      $('li').removeClass("active");
      $(this).addClass("active");
  });

  //Input Swiperight Handler
    $(".buddy").on("swiperight",function(){
      $(this).addClass('rotate-left').delay(700).fadeOut(1);
      $('.buddy').find('.status').remove();

      $(this).append('<div class="status like">Like!</div>');      
      if ( $(this).is(':last-child') ) {
        $('.buddy:nth-child(1)').removeClass ('rotate-left rotate-right').fadeIn(300);
       } else {
          $(this).next().removeClass('rotate-left rotate-right').fadeIn(400);
       }
    });  

  // Input Swipeleft  Handler
   $(".buddy").on("swipeleft",function(){
    $(this).addClass('rotate-right').delay(700).fadeOut(1);
    $('.buddy').find('.status').remove();
    $(this).append('<div class="status dislike">Dislike!</div>');

    if ( $(this).is(':last-child') ) {
     $('.buddy:nth-child(1)').removeClass ('rotate-left rotate-right').fadeIn(300);
      alert('OUPS');
     } else {
        $(this).next().removeClass('rotate-left rotate-right').fadeIn(400);
    } 
  });

});