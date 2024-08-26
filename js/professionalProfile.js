/*
$(document).ready(function() {
    sendProfessionalProfileData();
});
*/

function professionalProfile(elementName) {
    //Check if sessionID is valid
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

    $.ajax({
        url: 'http://localhost:8080/checkForSession',
        data: userdata,
        type: 'POST',
        contentType: 'application/json',
        jsonpCallback: 'callback', // this is not relevant to the POST anymore
        success: function (data) {
            
           var userData = JSON.parse(data);
           $(elementName).html(userData.firstName);

           //Add a sign out feature

           //Change service request feature to "Make a service request and not a login feature"

        },
        error: function (xhr, status, error) {
            alert(error);
            
        },
    });

} 

function sendProfessionalProfileData() {
    var userProfName = $(".prof-name").val();
    var reviewerName = $(".review-name").val();
    var reviewerLocation = $(".review-location").val();
    var reviewDate = $(".review-date").val();
    var rating = $(".rating").val();
    var reviewService = $(".review-service").val();
    var reviewContent = $(".review-content").val();

    var professionalData = JSON.stringify({ "Customer Name" : userProfName })
    var professionalReviewData = JSON.stringify({"Reviewer Name" : reviewerName,
                                            "Location" : reviewerLocation,
                                            "Date" : reviewDate,
                                            "Star Rating" : rating,
                                            "Service" : reviewService,
                                            "Review" : reviewContent
                                            });

    $.ajax ({
        url: 'http://localhost:8080/professionalProfile',
        data: professionalData, professionalReviewData,
        type: 'POST',
        contentType: 'application/json',
        success: function (data) {
    
            var sessionInformation = JSON.parse(data);
            document.cookie = "sessionID = " + sessionInformation.sessionID + ";";
            window.open("index.html", "_self");

            // fix this username display
            // apply user name to ui
            $(elementName).html(sessionInformation.firstName); 
        },
        error: function (xhr, status, error){
            alert(error);
        },
    });
}

/*
function sendProfessionalProfileData(elementName) {
    var userProfName = $(".prof-name").val();
    var reviewerName = $(".review-name").val();
    var reviewerLocation = $(".review-location").val();
    var reviewDate = $(".review-date").val();
    var rating = $(".rating").val();
    var reviewService = $(".review-service").val();
    var reviewContent = $(".review-content").val();

    var professionalData = JSON.stringify({ "Customer Name" : userProfName })
    var professionalReviewData = JSON.stringify({"Reviewer Name" : reviewerName,
                                            "Location" : reviewerLocation,
                                            "Date" : reviewDate,
                                            "Star Rating" : rating,
                                            "Service" : reviewService,
                                            "Review" : reviewContent
                                            });

    $.ajax ({
        url: 'http://localhost:8080/professionalProfile',
        data: professionalData, professionalReviewData,
        type: 'POST',
        contentType: 'application/json',
        success: function (data) {
    
            var sessionInformation = JSON.parse(data);
            document.cookie = "sessionID = " + sessionInformation.sessionID + ";";
            window.open("index.html", "_self");

            // fix this username display
            // apply user name to ui
            alert("POO" +sessionInformation.userProfName);
            $(elementName).html(sessionInformation.firstName); 
        },
        error: function (xhr, status, error){
            alert(error);
        },
    });
}
*/