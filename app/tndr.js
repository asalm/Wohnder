// Source: https://codepen.io/developingidea/pen/meAIn


$(document).ready(function(){

addCards();
function addCards(){
  jQuery.when(
    jQuery.getJSON("http://localhost:8081/getWohnung")
  ).done (function (json){
    console.log(json);
      for(var i = 0; i < json.length;i++){
        var backgroundimg = "https://1.bp.blogspot.com/_qEbjiFbQWGM/TCBVlN3mkYI/AAAAAAAADCM/7CjYqUHwbgY/s1600/workshop_modell_0126.jpg"
        var outerBody = document.createElement('div');
        outerBody.id = parseInt(json[i].id);
        var avatar = document.createElement('div');
        outerBody.classList.add('buddy');
        outerBody.style = "display:block";
        avatar.classList.add('avatar');
        avatar.style = "display:block; background-image: url(" + backgroundimg + ")"; 
        outerBody.appendChild(avatar);
    
        var title = document.createElement('h1');
        title.innerHTML = json[i].title;
        outerBody.appendChild(title);
        var p = document.createElement('p');
        p.classList.add('has-text-black');
        p.innerHTML = json[i].description;
        outerBody.appendChild(p);

        var ol = document.createElement('ol');
        ol.classList.add('info');
        var li1 = document.createElement('li');
        var li2 = document.createElement('li');
        var li3 = document.createElement('li');
        li1.innerHTML = json[i].rent + "€";
        li2.innerHTML = json[i].roomsize + "qm²";
        li3.innerHTML = json[i].mates + " MB";
        ol.appendChild(li1);
        ol.appendChild(li2);
        ol.appendChild(li3);
        outerBody.appendChild(ol);
        document.getElementById('tinder').appendChild(outerBody);
        console.log("kid added");
      }
      console.log("Event Listeners attached");
      setUpEventListeners();
  });
  }
function sendFlat(){
  var data = {
    title: document.getElementById("flt_title").value,
    rent: document.getElementById("flt_price").value,
    available: document.getElementById("flt_date").value,
    adresse:  document.getElementById("flt_adress").value,
    roomsize: document.getElementById("rm_size").value,
    flatsize: document.getElementById("flt_size").value,
    mates: document.getElementById("flt_mates").value,
    description: document.getElementById("flt_desc").value,
    userid: parseInt(1)
  };
  if(data.rent === null || data.title === null || data.available === null || data.roomsize === null || data.adresse === null){
    alert("Es fehlen Informationen!");
  }
  $.post('http://localhost:8081/addWohnung', data).done(function(response){
    console.log("Daten versendet");
    document.getElementById("flt_title").value = "";
    document.getElementById("flt_price").value = "";
    document.getElementById("flt_date").value = "";
    document.getElementById("flt_adress").value = "";
    document.getElementById("rm_size").value = "";
    document.getElementById("flt_size").value = "";
    document.getElementById("flt_mates").value = "";
    document.getElementById("flt_desc").value = "";
  });

  console.log("flat send");
}
  function setUpEventListeners(){
    document.getElementById("sendFlat").addEventListener("click",function(){sendFlat();});


                 //Input Swiperight Handler
                 $('.buddy').on("swiperight",function(){
                  //Client Server Processing
                  console.log($(this).val('id'));
                  var id = $(this).val('id').context.id;
                  console.log(id);
          
                  $.post('http://localhost:8081/addMatch', {user_id:parseInt(1),wohnung_id:id,match_date: Date.now()})
                  .done(function(response){
                  });
                  //Animation Event Geschichte
              
                    $(this).addClass('rotate-left').delay(700).fadeOut(1);
                    $('.buddy').find('.status').remove();
              
                    $(this).append('<div class="status like">Like!</div>');
                    setTimeout(function(){
                      if(document.getElementById(id) != null){
                      document.getElementById(id).parentNode.removeChild(document.getElementById(id));
                    }},800);
                    if ( $(this).is(':last-child') ) {
                      //$('.buddy:nth-child(1)').removeClass ('rotate-left rotate-right').fadeIn(300);
                      //addCards();
                     } else {
                        $(this).next().removeClass('rotate-left rotate-right').fadeIn(400);
                     }
                  });  
              
                // Input Swipeleft  Handler
                 $('.buddy').on("swipeleft",function(){
                  //Client Server Processing
                  var id = $(this).val('id').context.id;
                  console.log(id);
              
                  //Animation Event Geschichte
                  $(this).addClass('rotate-right').delay(700).fadeOut(1);
                    $(this).find('.status').remove();
                    $('.buddy').append('<div class="status dislike">Dislike!</div>');
                    setTimeout(function(){
                      if(document.getElementById(id) != null){
                      document.getElementById(id).parentNode.removeChild(document.getElementById(id));
                    }},800);
                    if ( $(this).is(':last-child') ) {
                    //$('.buddy:nth-child(1)').removeClass ('rotate-left rotate-right').fadeIn(300);
                      //addCards();
          
                    } else {
                        $(this).next().removeClass('rotate-left rotate-right').fadeIn(400);
                    } 
                  });
                
  }
  document.getElementById("content_flat").style = "visibility:none";
  //Menu Activation Handler
    $('ol li').click(function(){
      console.log($(this).attr("id"));
      if($(this).attr("id") === "search"){
          document.getElementById("content_search").style.display = "block";
          document.getElementById("content_msg").style.display = "none";
          document.getElementById("content_flat").style.display = "none";
          document.getElementById("content_settings").style.display = "none";

      }else if($(this).attr("id") === "msg"){
        document.getElementById("content_search").style.display = "none";
        document.getElementById("content_msg").style.display = "block";
        document.getElementById("content_flat").style.display = "none";
        document.getElementById("content_settings").style.display = "none";

      }else if($(this).attr("id") === "flat"){
        document.getElementById("content_search").style.display = "none";
        document.getElementById("content_msg").style.display = "none";
        document.getElementById("content_flat").style.display = "block";
        document.getElementById("content_settings").style.display = "none";
        console.log("flat clicked");

      }else if($(this).attr("id") === "settings"){
        document.getElementById("content_search").style.display = "none";
        document.getElementById("content_msg").style.display = "none";
        document.getElementById("content_flat").style.display = "none";
        document.getElementById("content_settings").style.display = "block";

      }
      $('li').removeClass("active");
      $(this).addClass("active");
  });

  

});