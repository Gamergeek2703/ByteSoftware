function sendSubscriptionData(subscriptionAmount){
    //Set subscription amount 
    localStorage.setItem("subscriptionAmount",subscriptionAmount)

    if(subscriptionAmount == 5000)
    {window.open("PaymentScreen.html")}

    else if(localStorage.getItem("currentlySigningUpCustomer") != undefined) {
        localStorage.removeItem("currentlySigningUpCustomer");
        alert("Successfully signed up")
        window.open("index.html","_self")
    }
    else{
        localStorage.removeItem("currentlySigningUpProfessional");
        alert("Successfully signed up")
        window.open("index.html","_self")
    }


}