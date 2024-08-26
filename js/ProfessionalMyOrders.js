$(document).ready(function(elementName) {
    function sendProfessionalOrdersData(elementName) {
        var orderNumber = $(".data-orderNum").val();
        var dateTime = $(".data-date").val();
        var status = $(".status").val();
        var total = $(".data-total").val();

        var professionalOrderData = JSON.stringify({
                                                    "Order Number" : orderNumber,
                                                    "Date and Time" : dateTime,
                                                    "Status" : status,
                                                    "Total" : total
        })

        $.ajax ({
            url: 'http://localhost:8080/ProfessionalMyOrders',
            data: professionalOrderData,
            type: 'POST',
            contentType: 'application/json',
            success: function (data){
                // apply user name to ui
                $(elementName).html(userData.firstName); 

                sessionInformation = JSON.parse(data)
                document.cookie = "sessionID = " + sessionInformation.sessionID + ";"
                window.open("index.html", "_self");
            },
            error: function (xhr, status, error){
                alert(error);
            },
        });
    }
})