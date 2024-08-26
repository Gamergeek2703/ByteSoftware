$(document).ready(function() {
    function sendCustomerOrdersData() {
        var orderNumber = $(".data-orderNum").val();
        var dateTime = $(".data-date").val();
        var status = $(".status").val();
        var total = $(".data-total").val();

        var customerOrderData = JSON.stringify({
                                                    "Order Number" : orderNumber,
                                                    "Date and Time" : dateTime,
                                                    "Status" : status,
                                                    "Total" : total
        })

        $.ajax ({
            url: 'http://localhost:8080/CustomerMyOrders',
            data: customerOrderData,
            type: 'POST',
            contentType: 'application/json',
            success: function (data){
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