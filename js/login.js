
function sendLoginData() {
  //Use JQuery to select data from fields
  var username = $("#email").val();
  var password = $("#password").val();

  //Convert to JSON String
  var userData = JSON.stringify({"email" : username , "password" : password})

  //Make AJAX Request
$.ajax({
    url: 'http://localhost:8080/CustomerLogin',
    data: userData,
    type: 'POST',
    contentType: 'application/json',
    jsonpCallback: 'callback', // this is not relevant to the POST anymore
    success: function (data) {

        console.log(data);
        //Convert JSON string into object
        sessionInformation = JSON.parse(data)
        
        //Store sessionID in cookie
        document.cookie = "sessionID = " + sessionInformation.sessionID + ";"

        //Go to landing page
        window.open("CustomerHomepage.html","_self");
    },
    error: function (xhr, status, error) {
        alert(error);
        
    },
});
}