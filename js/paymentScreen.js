function loadSubscriptionData(){
    //get subscription data
    var subscriptionAmount = localStorage.getItem("subscriptionAmount")
    $("#paymentAmountText").html("$" + subscriptionAmount);
}