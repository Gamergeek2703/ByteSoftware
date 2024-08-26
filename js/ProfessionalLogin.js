function sendLoginData() {
    //Use JQuery to select data from fields
    var username = $("#email").val();
    var password = $("#password").val();
  
    //Convert to JSON String
    var userData = JSON.stringify({"email" : username , "password" : password})
  
    // AJAX request for Professional
$.ajax({
    url: 'http://localhost:8080/Professional',
    data: userData,
    type: 'POST',
    contentType: 'application/json',
    jsonpCallback: 'callback', // this is not relevant to the POST anymore
    success: function (data) {

        //Convert JSON string into object
        sessionInformation = JSON.parse(data)
        
        //Store sessionID in cookie
        document.cookie = "sessionID = " + sessionInformation.sessionID + ";"

        //Go to landing page
        window.open("ProfessionalHomepage.html","_self");
    },
    error: function (xhr, status, error) {
        alert(error);
        
    },
});
}