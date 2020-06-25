$(document).ready(function(){

//hide all others by default

if(document.getElementById("content_register") !== null){document.getElementById("content_register").style = "visibility:none";}
if(document.getElementById("content_flat") !== null){document.getElementById("content_flat").style.display = "none";}
if(document.getElementById("content_msg") !== null){document.getElementById("content_msg").style= "visibility:none";}
if(document.getElementById("content_settings") !== null){document.getElementById("content_settings").style = "visibility:none";}
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

      }else if($(this).attr("id") === "login"){
        document.getElementById("content_login").style.display = "block";
        document.getElementById("content_register").style.display = "none";
        
        
      }else if($(this).attr("id") === "register"){
        document.getElementById("content_login").style.display = "none";
        document.getElementById("content_register").style.display = "block";
        
      }
      $('li').removeClass("active");
      $(this).addClass("active");
  });
});