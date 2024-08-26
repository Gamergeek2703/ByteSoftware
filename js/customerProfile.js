$(document).ready(function() {
    function sendCustomerProfileData() {
        var userCustName = $(".prof-name").val();
        var reviewerName = $(".review-name").val();
        var reviewerLocation = $(".review-location").val();
        var reviewDate = $(".review-date").val();
        var rating = $(".rating").val();
        var reviewService = $(".review-service").val();
        var reviewContent = $(".review-content").val();
    
        var customerData = JSON.stringify({ "Customer Name" : userCustName })
        var customerReviewData = JSON.stringify({"Reviewer Name" : reviewerName,
                                                "Location" : reviewerLocation,
                                                "Date" : reviewDate,
                                                "Star Rating" : rating,
                                                "Service" : reviewService,
                                                "Review" : reviewContent
                                                })
                                                
        $.ajax ({
            url: 'http://localhost:8080/CustomerProfile',
            data: customerData, customerReviewData,
            type: 'POST',
            contentType: 'application/json',
            success: function (data) {
                sessionInformation = JSON.parse(data)
                document.cookie = "sessionID = " + sessionInformation.sessionID + ";"
                window.open("index.html", "_self");
            },
            error: function (xhr, status, error){
                alert(error);
            },
        });
    }
});