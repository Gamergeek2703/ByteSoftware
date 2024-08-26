function checkForSignUps(){
    var currentlySigningUpUser = localStorage.getItem("currentlySigningUpCustomer");

    var currentlySigningUpProfessional = localStorage.getItem("currentlySigningUpProfessional");


    if (currentlySigningUpUser) {
        alert("You haven't finished your membership selection!")
        window.open("membership.html","_self")
    }

    else if (currentlySigningUpProfessional) {
        alert("You haven't finished your membership selection!")
        window.open("membership_prof.html","_self")
    }


}