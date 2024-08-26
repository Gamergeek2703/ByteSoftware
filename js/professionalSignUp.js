function sendProfessionalData() {
    var firstName = $("#first").val();
    var lastName = $("#last").val();
    var email = $("#email").val();
    var compName = $("#company_name").val();
    var password = $("#password").val();
    var address = $("#address").val();
    var zip = $("#zip").val();
    var dob = $("#dob").val();
    var phoneNum = $("#phone_number").val();
    var experience = $("#exp").val();
    var distance = $("#distance").val();
    var time = $("#time").val();
    var services = [];


        //HTML code to select list items
        $("#servicesProvided li").filter(".item.checked").find("span.item-text").get().forEach(element =>{
        services.push($(element).html().trim());
    })

    console.log(services);
    var profesData = JSON.stringify({
                                    "firstName" : firstName, 
                                    "lastName" : lastName,
                                    "dateOfBirth" : dob,
                                    "phoneNumber" : phoneNum,
                                    "email" : email,
                                    "company" : compName,
                                    "address" :address,
                                    "zip" : zip,
                                    "password" : password,
                                    "experience" : experience,
                                    "distanceTravelled" : distance,
                                    "timeAvailable" : time,
                                    "servicesProvided" : services,
    })

    $.ajax ({
        url : 'http://localhost:8080/ProfessionalSignUp',
        data: profesData,
        type: 'POST',
        contentType: 'application/json',
        success: function (data) {

            //Set local storage 
            localStorage.setItem("currentlySigningUpProfessional",email)

            window.open("membership_prof.html", "_self");
        },
        error: function (xhr, status, error) {
            alert(error);
        },
    });
}
;