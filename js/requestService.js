
function sendServiceRequest() {
    var serviceSelected =  $("#serviceSelected").val().trim();
    var location = $("#location").val();
    var serviceDistance = $("#serviceDistance").val();
    var extraDetails = $("#extraDetails").val();    
    
   //Iterate through cookies to find sessionID
   var cookies = document.cookie.split(";");
   var sessionID;
   cookies.forEach(cookie=> {
    var[key,value] = cookie.split("=")
    if(key.trim().toLowerCase() === "sessionid") {
        sessionID = value;
    }
})



    console.log(serviceSelected);
 

    //Convert to JSON String
    var userData = JSON.stringify({
        "serviceSelected" : serviceSelected,
        "location" : location,
        "serviceDistance" : serviceDistance,
        "extraDetails" : extraDetails,
        "sessionID" : sessionID
    })
  
    //Make AJAX Request
  $.ajax({
      url: 'http://localhost:8080/makeServiceRequest',
      data: userData,
      type: 'POST',
      contentType: 'application/json',
      jsonpCallback: 'callback', // this is not relevant to the POST anymore
      success: function (data) {
        alert("Successfully made service request")
      },
      error: function (xhr, status, error) {
          alert(error);
          
      },
  });
  }
  