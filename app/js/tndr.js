// Source: https://codepen.io/developingidea/pen/meAIn
$(document).ready(function () {

  //Check if user has ID!
  if (sessionStorage.getItem('userid') === null) {
    window.location.pathname = "./";
  } else {
    console.log(sessionStorage.getItem("userid"));
    console.log(sessionStorage.getItem("displayname"));
    document.getElementById('displayname').innerHTML = sessionStorage.getItem("displayname");
  }

  addCards();
  addFlats();

  updateBadges();

  function updateBadges() {
    console.log("updating badges");
    //var matches = sessionStorage.getItem("matchcount") != null ? sessionStorage.getItem("matchcount") : "0";
    var flats = sessionStorage.getItem("flat_count") != null ? sessionStorage.getItem("flat_count") : "0";

    //document.getElementById("badge_matches").innerHTML = matches;
    document.getElementById("badge_flats").innerHTML = flats;

  }

  function addFlats() {
    console.log("adding flats for " + sessionStorage.getItem("userid"));
    var myFlats;
    jQuery.when(
      $.post('http://localhost:8081/getMyFlats', {
        user_id: sessionStorage.getItem("userid")
      })
      .done(function (json) {
        console.log("flats", json);
        json = JSON.parse(json);
        sessionStorage.setItem("flat_count", json.length);
        for (var i = 0; i < json.length; i++) {
          var outerBody = document.createElement('div');
          console.log("FLAT ID",json[i].id);
          outerBody.id = parseInt(json[i].id);
          outerBody.classList.add('box');
          var textBox = document.createElement('p');
          var title = document.createElement('strong');
          title.innerHTML = json[i].title;
          var infos = document.createElement('small');
          var desc = document.createElement('p');
          desc.innerHTML = json[i].description;
          infos.innerHTML = json[i].available;
          textBox.appendChild(title);
          textBox.appendChild(infos);
          outerBody.appendChild(textBox);

          outerBody.append(desc);
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

          var delbutton = document.createElement("button");
          delbutton.classList.add("button");
          delbutton.classList.add("delbutton");
          delbutton.innerHTML = "löschen";
          outerBody.id = parseInt(json[i].id);

          outerBody.appendChild(delbutton);
          document.getElementById("flat_container").appendChild(outerBody);
        }
        addMatches(json);
        //updateBadges();
      })
    );
  }

  function addCards() {
    console.log("adding cards");
    jQuery.when(
      jQuery.getJSON("http://localhost:8081/getWohnung")
    ).done(function (json) {
      console.log("cards", json);
      for (var i = 0; i < json.length; i++) {
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
    });
  }

  function addMatches(flats) {
    console.log("flats", flats);
    var flatcount = 0;
    var container = document.getElementById("match_container");
      for (var i = 0; i < flats.length; i++) {
      console.log("Wohnung", flats[i].title);
      var flatname = flats[i].title;
      var flattitle = document.createElement("h2");
      flattitle.innerHTML = flatname;
      container.appendChild(flattitle);
      var columns = document.createElement("div");
      columns.classList.add("columns");
      jQuery.when($.post('http://localhost:8081/getMatches', {
          wohnung_id: flats[i].id
        })
        .done((json) => {
          if (json[0] === null) {
            var sorry = document.createElement("h2");
            h2.classList.add(title);
            sorry.innerHTML += "keine Matches";
            container.appendChild(sorry);
          } else {
            console.log("matches", json);
            var flatc;
            json.forEach(entry => {
              console.log("match added!");
              var outer = document.createElement("div");
              outer.classList.add('column');
              var inner = document.createElement("div");
              inner.classList.add('matchbox');
              var name = document.createElement("h2");
              name.innerHTML = entry.name;
              outer.appendChild(inner);
              inner.appendChild(name);
              columns.appendChild(outer);
              flatc =+ 1;
            });
            container.appendChild(columns);
          }
        }));
        console.log("Event Listeners attached");
        setUpEventListeners();
    }
  }

  function profileUpdate() {
    console.log("updating profile");
    var name = document.getElementById("settings_name").value != null ? document.getElementById("settings_name").value : "";
    var pnumber = document.getElementById("settings_number").value != null ? document.getElementById("settings_number").value : "";
    var gen = document.getElementById("settings_gender").value != null ? document.getElementById("settings_gender").value : "";
    var age = document.getElementById("settings_age").value != null ? document.getElementById("settings_age").value : "";
    var data = {
      full_name: name,
      phone: pnumber,
      gender: gen,
      age: age,
      id: sessionStorage.getItem("userid")
    };
    $.post("http://localhost:8081/updateProfile", data).done(function (response) {
      console.log(response);
      sessionStorage.removeItem("displayname");
      sessionStorage.setItem("displayname", response[0]);
      console.log("Profil aktualisiert.");
    });
  }

  function sendFlat() {
    console.log("Sending Flat");
    var data = {
      title: document.getElementById("flt_title").value,
      rent: document.getElementById("flt_price").value,
      available: document.getElementById("flt_date").value,
      adresse: document.getElementById("flt_adress").value,
      roomsize: document.getElementById("rm_size").value,
      flatsize: document.getElementById("flt_size").value,
      mates: document.getElementById("flt_mates").value,
      description: document.getElementById("flt_desc").value,
      userid: parseInt(sessionStorage.getItem("userid"))
    };
    if (data.rent === null || data.title === null || data.available === null || data.roomsize === null || data.adresse === null) {
      alert("Es fehlen Informationen!");
    } else {
      $.post('http://localhost:8081/addWohnung', data).done(function (response) {
        document.getElementById("flt_title").value = "";
        document.getElementById("flt_price").value = "";
        document.getElementById("flt_date").value = "";
        document.getElementById("flt_adress").value = "";
        document.getElementById("rm_size").value = "";
        document.getElementById("flt_size").value = "";
        document.getElementById("flt_mates").value = "";
        document.getElementById("flt_desc").value = "";
        console.log("flat send");
        addFlats();
      });


    }
  }

  function logOut() {
    console.log("LOGOUT");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("userid");
    setTimeout(function () {
      window.location.pathname = "./";
    }, 800);
  }

  function setUpEventListeners() {
    document.getElementById("sendFlat").addEventListener("click", function () {
      sendFlat();
    });
    document.getElementById("profileUpdate").addEventListener("click", function () {
      profileUpdate();
    });
    document.getElementById("logoutButton").addEventListener("click", function () {
      logOut();
    });

    $('.delbutton').on("click", function(e){
      e.preventDefault();
      
      var thisid = $(this).context.parentElement.attributes.id;
      sessionStorage.setItem("deleteFlat",thisid.value);
      console.log("Deleting",thisid.value);
      jQuery.post('http://localhost:8081/deleteFlat', {
        id: sessionStorage.getItem("deleteFlat")
      }).done(function (response) {
        sessionStorage.removeItem("deleteFlat");
        window.location.pathname = "./app";
        console.log(response);});

    });
    //Input Swiperight Handler
    $('.buddy').on("swiperight", function () {
      //Client Server Processing
      console.log($(this).val('id'));
      var id = $(this).val('id').context.id;
      console.log(id);

      $.post('http://localhost:8081/addMatch', {
          user_id: sessionStorage.getItem("userid"),
          wohnung_id: id,
          match_date: Date.now()
        })
        .done(function (response) {});
      //Animation Event Geschichte

      $(this).addClass('rotate-left').delay(700).fadeOut(1);
      $('.buddy').find('.status').remove();

      $(this).append('<div class="status like">Like!</div>');
      setTimeout(function () {
        if (document.getElementById(id) != null) {
          document.getElementById(id).parentNode.removeChild(document.getElementById(id));
        }
      }, 800);
      if ($(this).is(':last-child')) {
        //$('.buddy:nth-child(1)').removeClass ('rotate-left rotate-right').fadeIn(300);
        //addCards();
      } else {
        $(this).next().removeClass('rotate-left rotate-right').fadeIn(400);
      }
    });

    // Input Swipeleft  Handler
    $('.buddy').on("swipeleft", function () {
      //Client Server Processing
      var id = $(this).val('id').context.id;
      console.log(id);

      //Animation Event Geschichte
      $(this).addClass('rotate-right').delay(700).fadeOut(1);
      $(this).find('.status').remove();
      $('.buddy').append('<div class="status dislike">Dislike!</div>');
      setTimeout(function () {
        if (document.getElementById(id) != null) {
          document.getElementById(id).parentNode.removeChild(document.getElementById(id));
        }
      }, 800);
      if ($(this).is(':last-child')) {
        //$('.buddy:nth-child(1)').removeClass ('rotate-left rotate-right').fadeIn(300);
        //addCards();

      } else {
        $(this).next().removeClass('rotate-left rotate-right').fadeIn(400);
      }
    });

  }




});