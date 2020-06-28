function submitLogin() {
    console.log("login submitted");

    var usrname = document.getElementById("login_name").value;
    var mail = document.getElementById("login_mail").value;

    if(usrname != null && mail != null){
        var data= {
            name:usrname,
            mail:mail
        };
        $.post('http://localhost:8081/signup',data).done(function(response){
            console.log("Login attempt:",response);
            var userid = response[0].id;
            var username = response[0].full_name;
            console.log(userid);
            sessionStorage.setItem("userid",userid);
            sessionStorage.setItem("displayname",username);
            console.log(sessionStorage.getItem("userid"));
            setTimeout(function(){window.location.pathname = "/app";},800);
        });
    }
    //window.location.pathname = "/app";
}

function signUp(){
    console.log("signup submitted");

    var usrname = document.getElementById('usr_name').value;
    var email = document.getElementById('usr_email').value;
    var email2 = document.getElementById('usr_email2').value;

    //compare and execute
    if(usrname !== null && email === email2){
        var data = {
            name: usrname,
            mail: email,
        };
        $.post('http://localhost:8081/addUser', data).done(function(response){
            console.log(response);
            var userid = response.insertId;
            var username = response[0].full_name;
            sessionStorage.setItem('userid',userid);
            sessionStorage.setItem("displayname",username);

            setTimeout(function(){window.location.pathname = "/app";},800);
        });
    }
}