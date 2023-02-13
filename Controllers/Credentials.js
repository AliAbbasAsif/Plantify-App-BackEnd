const SignupModal = require("../models/Credentials");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
//NOTE - CHECK BELOW DESCRIPTION FOR USEAGE
//STUB - TOKEN CREATION
/* jsonwebtoken has a method sign that takes a payload as first argument, a secret key
as second argument and a callback function(for asynchronous operations) that has
an err and token as its arguments and we can return the token as a response from it
as the third argument, the fourth argument (which is optional) can be given to provide expiresIn parameter 
to specify the time in which the token expires */
// STUB - TOKEN FORMAT
// Authorization: Bearer**space**<access_token>

function verifyToken(token, secretKey) {
  jwt.verify(request.token, "secretkey123", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "Authorized",
        authData,
      });
    }
  });
}
const CredentialController = {
  Signup: (request, response) => {
    const { firstname, lastname, Email, Password, mobilenumber } =
      request.body;
    console.log(request.body);
    if (
      !firstname ||
      !lastname ||
      !Email ||
      !Password ||
      !mobilenumber
    ) {
      response.json({
        message: "Requires fields are missing",
        status: false,
      });
      return;
    }

    const Hashpassword = bcrypt.hashSync(Password, 10);
    console.log(Hashpassword, "HashPassword");
    const objtoSend = {
      first_name: firstname,
      last_name: lastname,
      email: Email,
      password: Hashpassword,
      mobile_number: mobilenumber,
    };
    SignupModal.findOne({ email: Email }, (error, user) => {
      console.log(request.body);
      if (error) {
        response.json({
          message: "DB Error",
          status: false,
        });
      } else {
        console.log(user, "User");
        if (user) {
          response.json({
            message: "Email address already exits",
            status: false,
          });
        } else {
          SignupModal.create(objtoSend, (error, user) => {
            if (error) {
              response.json({
                message: `Internal error ${error}`,
                status: false,
              });
            } else {
              response.json({
                message: "Data successfully added",
                user: user,
                status: true,
              });
            }
          });
        }
      }
    });
  },
  Login: (request, response) => {
    console.log(request.body, "request.body");
    const { email, password } = request.body;
    if ((!email, !password)) {
      response.json({
        message: "Requires fields are missing",
        status: false,
      });
      return;
    }
    SignupModal.findOne({ email: email }, (error, user) => {
      if (error) {
        response.json({
          message: "internal error",
          status: false,
        });
        return;
      } else {
        if (!user) {
          response.json({
            message: "Credential error",
            status: false,
          });
          return;
        } else {
          console.log("User", user);
          const comparepassword = bcrypt.compareSync(password, user.password);
          console.log(comparepassword, "comparepassword");
          if (comparepassword) {
            let token = jwt.sign(
              { user: request.body },
              "secretkey123",
              { expiresIn: `${60 * 60*  24}s` },
              (err, token) => {
                response.json({
                  message: "User successfully login",
                  status: true,
                  user,
                  token,
                });
              }
            );
           } else {
            response.json({
              message: "Credential error",
              status: false,
            });
          }
        }
      }
    });
  },
};

module.exports = CredentialController;
