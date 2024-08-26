import express from 'express'
import cors from 'cors'
import mongoose, { Document } from 'mongoose';
import chalk from "chalk";
import crypto from 'crypto'
import e from 'express';
import { error } from 'console';

//Stop Mongoose From Pluralizing 
mongoose.pluralize(null);

//Initiate Connection With MongoDB
const connection = mongoose.connect('mongodb+srv://dannyvitty:Miniclip12345@cluster0.m71w0t3.mongodb.net/314Project?retryWrites=true&w=majority', {
  useNewUrlParser: true, useUnifiedTopology: true
});

// Defining Schemas

//User Schema
const userSchema = new mongoose.Schema(
  {
    _id: String,
    firstName: String,
    lastName: String,
    password: String,
    address: String,
    zip: String,
    dateOfBirth: String,
    number: String
  }
)
// Define pro sign up schema
const ProfessionalSignUp = new mongoose.Schema({
  _id: String,
  firstName: String,
  lastName: String,
  password: String,
  address: String,
  zip: String,
  experience: String,
  service:  {
      type : Array,
      default : undefined 
    },
  distance: String,
  timeAvailable: String,
  companyName: String,
  phoneNum: String,
});

//Session Schema
const sessionSchema = new mongoose.Schema(
  {
    _id: String,
    email: String
  }
)

//Service Request Schema
const serviceRequestSchema = new mongoose.Schema({
    clientEmail : String,
    professionalEmails :  {
      type : Array,
      default : undefined 
    },
    serviceRequested : String,
    jobAddress : String,
    description : String

})

const inProgressServiceRequestSchema = new mongoose.Schema({
  _id : String,
  clientEmail : String,
  contractorEmail : String,
  serviceRequested : String,
  address : String
})

// Defining Models
const User = mongoose.model('UserData', userSchema);

const ProSignUpModel = mongoose.model('ProfessionalSignUp', ProfessionalSignUp);

const Session = mongoose.model("SessionData", sessionSchema);

const serviceRequestModel  = mongoose.model("PendingServiceRequests",serviceRequestSchema);

const inProgressServiceRequestModel = mongoose.model("InProgressRequests",inProgressServiceRequestSchema)

const completedRequestModel = mongoose.model("CompletedRequests",inProgressServiceRequestSchema)
if (connection) {

  console.log(chalk.greenBright.bold("Connected To Database Successfully"));

  // Create collection of Model
  User.createCollection().then(function (collection) {
    console.log(chalk.yellow('Collection Has Been Accessed!'));
  });


}

//Can't connect To Database
else {
  console.log(chalk.redBright("Error connecting to database"));
}

//Create Express Application
const app = express()

// create PORT const
const PORT = process.env.PORT || 8080;

/* set static folders
no need to reference 
- 'assets\example.jpg'
- 'CSS\...'
in landingpage
instead of ' src = "assets\Background Landing Page.jpg"  '
use ' src = "Background Landing Page.jpg" ' */
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use(express.static('assets'));
app.use(express.static('assets/font'))
app.use(express.static('css'));
app.use(express.static('js'));

//Allows Cross Origin Requests
app.use(cors())

//Adds a JSON parser
app.use(express.json());

//Listens for incoming requests on PORT 8080 posted by the frontend
app.listen(PORT, () => console.log(chalk.greenBright.bold('Server listening on port ' + PORT + '...')));

//Customer Login
app.post('/CustomerLogin', function (req, res) {


  //Try and find User
  User.find({ "_id": req.body.email })
    //User Exists
    .then(doc => {
      if (doc[0] != undefined) {

        //Incorrect password
        if (doc[0].password != req.body.password) {
          res.statusMessage = "Incorrect password";
          res.status(400).end();
        }

        //Successful login, create session variables
        else {
          //Generate session ID
          var sessionID = crypto.randomBytes(20).toString("hex");

          //Create session instance in DB
          var currentSession = new Session({
            _id: sessionID,
            email: req.body.email
          })

          //Save session instance
          Session.create(currentSession)

            //If successful
            .then(result => {
              res.status(200).send(JSON.stringify({ "sessionID": sessionID }));
            })

            //Server Error
            .catch(error => {
              res.statusMessage = "Server Error";
              res.status(400).end()
            })
        }
      }

      //User does not exist
      else {
        res.statusMessage = "User doesn't exist"
        res.status(400).end();
      }
    })
    //Login Issue
    .catch((error => {
      console.log(error);
    }))


})

//Professional log in
app.post('/Professional', function (req, res) {

  //Try and find User
  ProSignUpModel.find({ "_id": req.body.email })
    //User Exists
    .then(doc => {
      if (doc[0] != undefined) {

        //Incorrect password
        if (doc[0].password != req.body.password) {
          res.statusMessage = "Incorrect password";
          res.status(400).end();
        }

        //Successful login, create session variables
        else {
          //Generate session ID
          var sessionID = crypto.randomBytes(20).toString("hex");
          //Create session instance in DB
          var currentSession = new Session({
            _id: sessionID,
            email: req.body.email
          })

          //Save session instance
          Session.create(currentSession)

            //If successful
            .then(result => {
              res.status(200).send(JSON.stringify({ "sessionID": sessionID }));
            })

            //Server Error
            .catch(error => {
              res.statusMessage = "Server Error";
              res.status(400).end()
            })
        }
      }

      //User does not exist
      else {
        res.statusMessage = "User doesn't exist"
        res.status(400).end();

      }
    })
    //Login Issue
    .catch((error => {
      console.log(error);
    }))
})

//Registration Function
app.post('/RegistrationData', function (req, res) {

  var newUser = new User({
    _id: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    address: req.body.address,
    zip: req.body.zip,
    dateOfBirth: req.body.dateOfBirth,
    number: req.body.number
  })

  User.create(newUser)
    //If successful
    .then(result => {
      res.status(200).send("Successful");
    })
    //
    .catch(error => {
      //User already exists
      if (error.code == 11000) {
        res.statusMessage = "Account already exists under this email";
        res.status(400).end()
      }
    })
})
//Professional registration POST
app.post('/ProfessionalSignUp', function (req, res) {
  console.log(req.body.servicesProvided);
  var newUser = new ProSignUpModel({
    _id: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    address: req.body.address,
    zip: req.body.zip,
    experience: req.body.experience,
    service: req.body.servicesProvided,
    distance: req.body.distance,
    timeAvailable: req.body.timeAvailable,
    companyName: req.body.company,
    phoneNum: req.body.phoneNumber,
  });
  //test to get service checked
  if (newUser) {
    console.log(req.body.servicesProvided)
  } else
    console.log('nothing');
  //
  ProSignUpModel.create(newUser)
    //If successful
    .then(result => {
      console.log("Hello World!!!");
      res.status(200).send("Successful");
    })
    //
    .catch(error => {
      //User already exists
      if (error.code == 11000) {
        res.statusMessage = "Account already exists under this email";
        res.status(400).end()
      }
    })
})

//Check for sessions in database
app.post("/checkForSession", function(req,res){
  var sessionID = req.body.sessionID

  Session.find({"_id" : sessionID})
  .then(sessionDoc => {
    //If the sessionID exists
    if(sessionDoc[0] != undefined) {

      //Get user data
      User.find({"_id" : sessionDoc[0].email })

      //Return user data to Frontend for DOM manipulation
      .then(userDoc => {
        if(userDoc[0] != undefined) {
          res.status(200).send(JSON.stringify(userDoc[0]));
        }

      //Get Professional Data
      else{
        ProSignUpModel.find({"_id" : sessionDoc[0].email })

        //Return user data to Frontend for DOM manipulation
        .then(userDoc => {
          if(userDoc[0] != undefined) {
            res.status(200).send(JSON.stringify(userDoc[0]));
          }
          else{
            res.status(400);
          }

      }
        )}
      })
    


      //Catch Errors
      .catch(error => {
        console.log(error)

      })
    }
    //Session doesn't exist
    else{
      res.status(400)
    }
  })
  .catch(error => {
    console.log(error)
  })

})

app.post("/makeServiceRequest", function(req,res){
  var sessionID = req.body.sessionID;
  ProSignUpModel.find( { service : req.body.serviceSelected } ).then(contractorArray => {
    
    var contractorEmails = [];

    //If there is a matching contractor
    if(contractorArray.length > 0) {
      contractorArray.forEach(contractorObject => {
        console.log(contractorObject._id);
        contractorEmails.push(contractorObject._id)
      })

    //Who's making the request?
    
    Session.find({"_id" : sessionID})
    .then(sessionDoc => {
      //If the sessionID exists
      if(sessionDoc[0] != undefined) {

        //Get user data
        User.find({"_id" : sessionDoc[0].email })
        .then(userDoc => {
          if(userDoc[0] != undefined) {


            //Make service request object
            var newServiceRequest = new serviceRequestModel({
              clientEmail : userDoc[0]._id,
              professionalEmails : contractorEmails,
              serviceRequested : req.body.serviceSelected,
              jobAddress : req.body.location,
              description : req.body.description
            })

            serviceRequestModel.create(newServiceRequest)
            .then(
              result => {
                console.log("Successfully created service request")
                res.status(200).send();
              }
            )
            .catch(error => {console.log(error);res.status(400);})
          }
        })
        .catch(error => {console.log(error);res.status(200);})
      }
      else{console.log("No sessionID");res.status(400);};
    })
      .catch(error => {console.log(error);res.status(400);})
    }
  })

})

app.post("/loadNumberOfRequests", function(req,res){

  const requestNumbers = {
      pendingRequestCount : 0,
      inProgressRequestCount : 0,
      completedRequestCount : 0
  };
  var contractorEmail = req.body.email;


  //Get Counts
  serviceRequestModel.count({ professionalEmails : contractorEmail }).then(pendingRequestCount => {
    requestNumbers.pendingRequestCount = pendingRequestCount

    //Get In Progress Counts
    inProgressServiceRequestModel.count({ contractorEmail : contractorEmail }).then(inProgressRequestCount => {
      requestNumbers.inProgressRequestCount = inProgressRequestCount

    //Get Completed Counts
    completedRequestModel.count({ contractorEmail : contractorEmail }).then(completedRequestCount => {
      requestNumbers.completedRequestCount = completedRequestCount
      res.status(200).send(JSON.stringify(requestNumbers))
      
  }).catch(err =>{
    console.log(err)
    res.status(400).send;
  })

    }).catch(err =>{
      console.log(err)
      res.status(400).send;
    })

  }).catch(err =>{
    console.log(err)
    res.status(400).send;
  })



})

app.post("/ContractorPendingRequests", function(req,res){

  var requestArray = []
  var contractorEmail = req.body.contractorEmail;


  serviceRequestModel.find({ professionalEmails : contractorEmail }).then(pendingRequests => {
    pendingRequests.forEach(requestDocument => {
      requestArray.push(requestDocument.toObject());
    })

   res.status(200).send(JSON.stringify(requestArray))

  })


})

app.post("/ContractorActiveRequests", function(req,res){

  var requestArray = []
  var professionalEmail= req.body.contractorEmail;



    inProgressServiceRequestModel.find({ contractorEmail : professionalEmail }).then(pendingRequests => {
    pendingRequests.forEach(requestDocument => {
      requestArray.push(requestDocument.toObject());
    })

   res.status(200).send(JSON.stringify(requestArray))

  })


})

app.post("/ContractorCompletedRequests", function(req,res){

  var requestArray = []
  var professionalEmail= req.body.contractorEmail;



    completedRequestModel.find({ contractorEmail : professionalEmail }).then(pendingRequests => {
    pendingRequests.forEach(requestDocument => {
      requestArray.push(requestDocument.toObject());
    })

   res.status(200).send(JSON.stringify(requestArray))

  })


})

//customer subscription schema
const CustSubSchema = new mongoose.Schema({
  _id: String,
});
// professional subscription
const ProSubSchema = new mongoose.Schema({
  _id: String,
});
//modelling cust and professional
const CustSubModel = mongoose.model("CustSubModel", CustSubSchema);
const ProSubModel = mongoose.model("ProSubModel", ProSubSchema);

// customer subscription after payment
app.post("/newUserSubscription", function(req, res){

  var newCust = new CustSubModel({
    _id: req.body.userEmail,
  })
  CustSubModel.create(newCust)
  .then(result => {
    console.log("Success Customer Subscription");
    res.status(200).send();
  })
  .catch(error =>{
    console.log("Customer subscription fail");
    res.status(400).end();
  })
});

// professional subscription after payment
app.post("/newProfessionalSubscription", function(req, res){
  var newCust = new ProSubModel({
    _id: req.body.userEmail,
  })
  ProSubModel.create(newCust)
  .then(result => {
    console.log("Success Professional Subscription");
    res.status(200).send();
  })
  .catch(error =>{
    console.log("Professional Subscription fail");
    res.status(400).end();
  })
});

app.post("/createInProgressRequest", function(req,res){
  var newInProgressRequest = new inProgressServiceRequestModel({
    _id : req.body.orderID,
    clientEmail : req.body.clientEmail,
    contractorEmail :  req.body.contractorEmail,
    serviceRequested :  req.body.serviceRequested,
    address :  req.body.address
  })

  inProgressServiceRequestModel.create(newInProgressRequest).then(response => {
    //Delete old record
    serviceRequestModel.deleteOne({_id : req.body.orderID}).then(response => {
      res.status(200).send("Successfully accepted job")
    })
    .catch(error => {
      res.status(400).send(error)
    })
  })
  .catch(error => {
    res.status(400).send(error)
  })


})

app.post("/createCompletedRequest", function(req,res){
  var newInProgressRequest = new inProgressServiceRequestModel({
    _id : req.body.orderID,
    clientEmail : req.body.clientEmail,
    contractorEmail :  req.body.contractorEmail,
    serviceRequested :  req.body.serviceRequested,
    address :  req.body.address
  })

  completedRequestModel.create(newInProgressRequest).then(response => {
    //Delete old record
    inProgressServiceRequestModel.deleteOne({_id : req.body.orderID}).then(response => {
      res.status(200).send("Successfully completed job")
    })
    .catch(error => {
      res.status(400).send(error)
    })
  })
  .catch(error => {
    res.status(400).send(error)
  })


})

app.post("/declineRequest", function(req,res){
  serviceRequestModel.updateOne(
    {_id : req.body.orderID ,professionalEmails: req.body.contractorEmail},
    { $pull: { professionalEmails: req.body.contractorEmail } }
    ).then(response => {
      res.status(200).send("Successfully declined job!")
    })
    .catch(error => {
      res.status(400).send(error)

    }) 


})