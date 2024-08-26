function loadData(elementName) {
    //Check if sessionID is valid
    var cookies = document.cookie.split(";");
    var contractorEmail;
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

    $.ajax({
        url: 'http://localhost:8080/checkForSession',
        data: userdata,
        type: 'POST',
        contentType: 'application/json',
        jsonpCallback: 'callback', // this is not relevant to the POST anymore
        success: function (data) {
            
           var userData = JSON.parse(data);
           $(elementName).html("Welcome, " + userData.firstName);

           userdata = JSON.stringify({
            "email" : userData._id
        });

           //Load number of requests
           $.ajax({
            url: 'http://localhost:8080/loadNumberOfRequests',
            data: userdata,
            type: 'POST',
            contentType: 'application/json',
            jsonpCallback: 'callback', // this is not relevant to the POST anymore
            success: function (data) {

                var requestNumbers = JSON.parse(data);
                
               //Change Numbers
               $("#pendingRequestDiv").html(requestNumbers.pendingRequestCount);
               $("#activeRequestDiv").html(requestNumbers.inProgressRequestCount);
               $("#completedRequestDiv").html(requestNumbers.completedRequestCount);


               
    
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