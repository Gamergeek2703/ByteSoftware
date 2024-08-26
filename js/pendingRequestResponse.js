
function acceptJob(buttonID){

    var contractorEmail
    var cookies = document.cookie.split(";");
    var sessionID;
      //Check if sessionID is valid

      //Iterate through cookies to find sessionID
      cookies.forEach(cookie=> {
        var[key,value] = cookie.split("=")
        if(key.trim().toLowerCase() === "sessionid") {
            sessionID = value;
        }
    })


      userdata = JSON.stringify({
          "sessionID" : sessionID
      });
  
      //Get the contractors email using the sessionID
      $.ajax({
          url: 'http://localhost:8080/checkForSession',
          data: userdata,
          type: 'POST',
          contentType: 'application/json',
          jsonpCallback: 'callback', // this is not relevant to the POST anymore
          success: function (data) {
             var userData = JSON.parse(data);
      
             var orderID = ($("#orderID"+buttonID).text())
             var clientEmail = ($("#clientEmail"+buttonID).text())
             contractorEmail = userData._id;
             var serviceRequested = ($("#serviceRequested"+buttonID).text())
             var address = ($("#jobAddress"+buttonID).text())
             
            
              userdata = JSON.stringify({
                  "orderID" : orderID,
                  "clientEmail" : clientEmail,
                  "contractorEmail" : contractorEmail,
                  "serviceRequested" : serviceRequested,
                  "address" : address
              });
  
  
              //Create an in progress session request
              $.ajax({
                  url: 'http://localhost:8080/createInProgressRequest',
                  data: userdata,
                  type: 'POST',
                  contentType: 'application/json',
                  jsonpCallback: 'callback', // this is not relevant to the POST anymore
                  success: function (data) {
                    alert("Successfully accepted job!")
                    location.reload();
                  
  
                  
  
                  },
                  error: function (xhr, status, error) {
                      alert(error);
                      
                  },
              });
  
  
          },
          error: function (xhr, status, error) {
              alert(error);
              
          },
      });
    
   
}

function declineJob(buttonID) {
    var contractorEmail
    var cookies = document.cookie.split(";");
    var sessionID;
      //Check if sessionID is valid

      //Iterate through cookies to find sessionID
      cookies.forEach(cookie=> {
        var[key,value] = cookie.split("=")
        if(key.trim().toLowerCase() === "sessionid") {
            sessionID = value;
        }
    })


      userdata = JSON.stringify({
          "sessionID" : sessionID

      });
  
      //Get the contractors email using the sessionID
      $.ajax({
          url: 'http://localhost:8080/checkForSession',
          data: userdata,
          type: 'POST',
          contentType: 'application/json',
          jsonpCallback: 'callback', // this is not relevant to the POST anymore
          success: function (data) {

            //Delete the contractor from the array under professional Email
             var userData = JSON.parse(data);
             contractorEmail = userData._id;
             var orderID = ($("#orderID"+buttonID).text())

              userdata = JSON.stringify({
                  "orderID" : orderID,
                  "contractorEmail" : contractorEmail,
      
              });

  
              //Create an in progress session request
              $.ajax({
                  url: 'http://localhost:8080/declineRequest',
                  data: userdata,
                  type: 'POST',
                  contentType: 'application/json',
                  jsonpCallback: 'callback', // this is not relevant to the POST anymore
                  success: function (data) {
                    alert("Successfully declined job!")
                    location.reload();
  
                  },
                  error: function (xhr, status, error) {
                      alert(error);
                      
                  },
              });
  
  
          },
          error: function (xhr, status, error) {
              alert(error);
              
          },
      });
    

}






