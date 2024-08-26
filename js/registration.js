
function sendRegistrationData() {
    //Use JQuery to select data from fields
    var email = $("#email").val();
    var firstName = $("#first").val();
    var lastName = $("#last").val();
    var password = $("#password").val();
    var address = $("#address").val();
    var zip = $("#zip").val();
    var DOB = $("#dob").val();
    var number = $("#number").val();
  
    //Convert to JSON String
    var userData = JSON.stringify({
        "email" : email , 
        "firstName" : firstName,
        "lastName" : lastName, 
        "password" : password,
        "address" : address , 
        "zip" : zip,
        "dateOfBirth" : DOB , 
        "number" : number
    })
  
    //Make AJAX Request
  $.ajax({
      url: 'http://localhost:8080/RegistrationData',
      data: userData,
      type: 'POST',
      contentType: 'application/json',
      jsonpCallback: 'callback', // this is not relevant to the POST anymore
      success: function (data) {
          //set local storage
          localStorage.setItem("currentlySigningUpCustomer",email)
          //Openm up membership options
          window.open("membership.html","_self");
      },
      error: function (xhr, status, error) {
          alert(error);
          
      },
  });
  }