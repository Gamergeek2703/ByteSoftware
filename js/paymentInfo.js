function sendPaymentData() {
        var userEmail;
        if(localStorage.getItem("currentlySigningUpCustomer")) {
   
            userEmail = localStorage.getItem("currentlySigningUpCustomer")
            var payData = JSON.stringify({
                "userEmail" : userEmail
                })

                alert(userEmail);
                alert(payData);

            $.ajax ({
                url: 'http://localhost:8080/newUserSubscription',
                data: payData,
                type: 'POST',
                contentType: 'application/json',
                success: function (data){
                    localStorage.removeItem("currentlySigningUpCustomer")
                    alert("Successfully signed up")
                    window.open("index.html", "_self");
                },
                error: function (xhr, status, error){
                    alert(error);
                },
            });

        }

        else{
            userEmail = localStorage.getItem("currentlySigningUpProfessional")
            var payData = JSON.stringify({
                "userEmail" : userEmail,
                })


            $.ajax ({
                url: 'http://localhost:8080/newProfessionalSubscription',
                data: payData,
                type: 'POST',
                contentType: 'application/json',
                success: function (data){
                    localStorage.removeItem("currentlySigningUpProfessional",null)
                    alert("Successfully signed up")
                    window.open("index.html", "_self");
                },
                error: function (xhr, status, error){
                    alert(error);
                },
            });

        }
        }