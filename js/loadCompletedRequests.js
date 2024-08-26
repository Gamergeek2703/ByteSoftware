
function loadCompletedRequests(elementName){


    //Check if sessionID is valid
    var contractorEmail
    var cookies = document.cookie.split(";");
    var sessionID;

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

    //Get the contractors email
    $.ajax({
        url: 'http://localhost:8080/checkForSession',
        data: userdata,
        type: 'POST',
        contentType: 'application/json',
        jsonpCallback: 'callback', // this is not relevant to the POST anymore
        success: function (data) {
           var userData = JSON.parse(data);
           contractorEmail = userData._id;

           // apply user name to ui
           $(elementName).html(userData.firstName); 

            //Get pendingRequests corresponding to Contractor
            userdata = JSON.stringify({
                "contractorEmail" : contractorEmail
            });


            $.ajax({
                url: 'http://localhost:8080/ContractorCompletedRequests',
                data: userdata,
                type: 'POST',
                contentType: 'application/json',
                jsonpCallback: 'callback', // this is not relevant to the POST anymore
                success: function (data) {
        
                    var responseData = JSON.parse(data)
                    for(var i = 0 ; i < responseData.length;i++) {
                        $("#requestsTable").append(
                            "<tr> <td id =orderID" + i + ">" + responseData[i]._id  + "</td>" 
                            + "<td id =clientEmail" + i + ">"+ responseData[i].clientEmail  + "</td>"
                            + "<td id =serviceRequested" + i + ">" + responseData[i].serviceRequested   + "</td>"
                            + "<td id =jobAddress" + i + ">"  + responseData[i].address   + "</td>"
                            + "</tr>"
                            
                             
                        )
                 
                    }
     
                

                

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